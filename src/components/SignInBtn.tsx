import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { FC } from "react";

const SignInBtn: FC<Props> = ({ text }) => {
  return (
    <Button variant={"secondary"} size={"sm"} asChild>
      <Link to={"/auth/sign-in"}>{text || "Link In!"}</Link>
    </Button>
  );
};

type Props = {
  text?: string;
};

export default SignInBtn;
