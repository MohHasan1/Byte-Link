import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Form } from "@/components/ui/form";
import { Link as LinkIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSigninUser } from "@/lib/react-query/queriesAndMutations";
import { useToast } from "@/components/ui/use-toast";
import { useAuthctx } from "@/context/AuthCtx";
import FormInputField from "@/components/form/FormInputField";
import { H2, H4, Lead, P } from "@/components/typography/typography";
import { SignInValidation, SignInValidationProps } from "@/lib/zod/validation";
import { handleAsyncOperation } from "@/utils/handleOperations";


const SignInForm = () => {
  const navigate = useNavigate();

  const { checkAuthUser } = useAuthctx();
  const { toast } = useToast();
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


    const session = await handleAsyncOperation(() =>
      signIn({
        email: values.email,
        password: values.password,
      })
    );

    if (!session) {
      return toast({
        variant: "destructive",
        title: "Sign-in failed. Please try again.",
      });
    }

    // we are using toast inside the function so its not triggeed.
    const auth = await checkAuthUser();

    if (auth) {
      form.reset();
      navigate("/");
    }
  }

  return (
    <>
      <div className="flex justify-center items-center gap-4 text-blue-500">
        <LinkIcon />
        <H2>ByteLink</H2>
      </div>

      <H4 className="mt-3">Sign In To To your Account</H4>
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

          <Button
            disabled={isPending}
            variant="secondary"
            type="submit"
            className="w-full mt-8"
          >
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
