import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Link as LinkIcon } from "lucide-react";
import {
  useSignUpUser,
  useSigninUser,
} from "@/lib/react-query/queriesAndMutations";
import { Link, useNavigate } from "react-router-dom";
import FormInputField from "@/components/form/FormInputField";
import { H2, H4, Lead, P } from "@/components/typography/typography";
import { SignUpValidationProps, SignUpValidation } from "@/lib/zod/validation";
import {
  handleAsyncAppwrite,
  handleAsyncOperation,
} from "@/utils/handleOperations";
import AgreementAlert from "@/components/AgrementAlert";
import { toast } from "sonner";
import { account } from "@/service/appwrite/config";

const SignUpForm = () => {
  const navigate = useNavigate();

  const { mutateAsync: signUp, isPending: signUpPending } = useSignUpUser();
  const { mutateAsync: signIn, isPending: signInPending } = useSigninUser();

  // 1. Define your form.
  const form = useForm<SignUpValidationProps>({
    resolver: zodResolver(SignUpValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(signUpInfo: SignUpValidationProps) {
    // ----- sign up ------ //
    const newUser = await handleAsyncOperation(() => signUp(signUpInfo));

    if (newUser === false) {
      toast.error("Sign-up failed! Please try again.");
      return;
    }

    // ----- sign in ------ //
    let session = await handleAsyncAppwrite(() =>
      signIn({
        email: signUpInfo.email,
        password: signUpInfo.password,
      })
    );

    // handle user_session_already_exists //
    if (session === "user_session_already_exists") {
      await handleAsyncOperation(() => account.deleteSession("current"));
      localStorage.removeItem("cookieFallback");
      session = await handleAsyncAppwrite(() =>
        signIn({
          email: signUpInfo.email,
          password: signUpInfo.password,
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
      <section>
        <div className="flex justify-center items-center gap-4 text-blue-500">
          <LinkIcon />
          <H2>ByteLink</H2>
        </div>

        <H4 className="mt-3"> Create a new account</H4>
        <Lead>
          <P className="mt-1 mb-4 text-sm">
            Please create a new account to sign-in
          </P>
        </Lead>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormInputField
              form={form}
              name="name"
              label="Name"
              description="Please provide your real name."
              autoComplete="name"
            />
            <FormInputField
              form={form}
              name="username"
              label="UserName"
              autoComplete="username"
            />
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

            <Button
              disabled={signUpPending || signInPending}
              type="submit"
              className="w-full mt-8"
            >
              Link Up!
            </Button>

            <Lead>
              <P className="mt-1 mb-4 text-sm text-center">
                <span>Already have an account? </span>
                <Link className="text-blue-400" to="/auth/sign-in">
                  Link In!
                </Link>
              </P>
            </Lead>
          </form>
        </Form>

        <section className="text-blue-400 hover:text-blue-300">
          <AgreementAlert showAlert={true} />
        </section>
      </section>
    </>
  );
};

export default SignUpForm;
