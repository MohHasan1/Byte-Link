import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Link as LinkIcon } from "lucide-react";
// import { useToast } from "@/components/ui/use-toast";
import {
  useSignUpUser,
  useSigninUser,
} from "@/lib/react-query/queriesAndMutations";
import { useAuthctx } from "@/context/AuthCtx";
import { Link, useNavigate } from "react-router-dom";
import FormInputField from "@/components/form/FormInputField";
import { H2, H4, Lead, P } from "@/components/typography/typography";
import { SignUpValidationProps, SignUpValidation } from "@/lib/zod/validation";
import { handleAsyncOperation } from "@/utils/handleOperations";
import Agrement from "@/components/AgrementAlert";

const SignUpForm = () => {
  const navigate = useNavigate();

  // const { toast } = useToast();
  const { checkAuthUser } = useAuthctx();
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
     await handleAsyncOperation(() => signUp(signUpInfo));

    // if (!newUser) {
    //   return toast({
    //     variant: "destructive",
    //     title: "Sign up failed. Please try again.",
    //   });
    // }

    await handleAsyncOperation(() =>
      signIn({
        email: signUpInfo.email,
        password: signUpInfo.password,
      })
    );

    // if (!session) {
    //   return toast({
    //     variant: "destructive",
    //     title: "Sigin failed. Please try again.",
    //   });
    // }

    const auth = await checkAuthUser();

    if (auth) {
      // logInfo(newUser);
      form.reset();
      // toast({
      //   title: "Welcome to ByteLink.",
      // });
      navigate("/");
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
              variant="secondary"
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
      </section>

      <section className="text-blue-400 hover:text-blue-300">
        <Agrement showAlert={true} />
      </section>
    </>
  );
};

export default SignUpForm;
