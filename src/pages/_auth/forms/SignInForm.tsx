import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Form } from "@/components/ui/form";
import { Link as LinkIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSigninUser } from "@/lib/react-query/queriesAndMutations";
import FormInputField from "@/components/form/FormInputField";
import { H4, Lead, P } from "@/components/typography/typography";
import { SignInValidation, SignInValidationProps } from "@/lib/zod/validation";
import {
  handleAsyncAppwrite,
  handleAsyncOperation,
} from "@/utils/handleOperations";
import { toast } from "sonner";
import { account } from "@/service/appwrite/config";

const SignInForm = () => {
  const navigate = useNavigate();
  const { mutateAsync: signIn, isPending } = useSigninUser();

  // 1. Define your form.
  const form = useForm<SignInValidationProps>({
    resolver: zodResolver(SignInValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: SignInValidationProps) {
    // handleAsyncOperation is not really needed as tanstack takes care of it //
    let session = await handleAsyncAppwrite(() =>
      signIn({
        email: values.email,
        password: values.password,
      })
    );

    // handle user_session_already_exists //
    if (session === "user_session_already_exists") {
      await handleAsyncOperation(() => account.deleteSession("current"));
      localStorage.removeItem("cookieFallback");
      session = await handleAsyncAppwrite(() =>
        signIn({
          email: values.email,
          password: values.password,
        })
      );
    }

    // handle user_invalid_credentials //
    if (session === "user_invalid_credentials") {
      toast.error("Invalid credentials.");
      return;
    }

    // success //
    if (typeof session !== "string") {
      // If session is not a string, assume it is a valid session object
      toast.info("Welcome to Byte-Link.");
      form.reset();
      navigate("/");
    } else {
      toast.error("An unexpected error occurred. Please try again.");
    }
  }

  return (
    <>
      <div className="flex justify-center items-center gap-4 text-blue-500">
        <LinkIcon size={30} />
        <h1 className="font-qsand text-2xl">ByteLink</h1>
      </div>

      <H4 className="mt-3">Sign In To Your Account</H4>
      <Lead>
        <P className="mt-1 mb-4 text-sm text-center">
          Please enter your details to sign-in
        </P>
      </Lead>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormInputField
            form={form}
            name="email"
            label="Email"
            type="email"
            autoComplete="email"
          />
          <FormInputField
            form={form}
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
          />

          <Button disabled={isPending} type="submit" className="w-full mt-8">
            link In!
          </Button>

          <Lead>
            <P className="mt-1 mb-4 text-sm text-center">
              <span>Don't have an account? </span>
              <Link className="text-blue-400" to="/auth/sign-up">
                LinkUp!
              </Link>
            </P>
          </Lead>
        </form>
      </Form>
    </>
  );
};

export default SignInForm;

/* 
NOTE: 
if we rerender (change route manually in teh search bar a reload is trigger) 
this will cause authctx to check in the local storage and redirect.

But if we use dont reload the webpage authctx does not check for token.

*/
