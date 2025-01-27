/* eslint-disable @typescript-eslint/no-explicit-any */
import { LogOut } from "lucide-react";
import LinkRenderer from "../sidebar-common/link-renderer";
import { LogoutAlert } from "@/components/LogOutAlert";
import { Small } from "@/components/typography/typography";
import { NAV_LINKS } from "../sidebar-common/nav-links";
import AuthWrapper from "@/components/wrapper/AuthWrapper";
import SignInBtn from "@/components/SignInBtn";
import useCheckIfUserAuth from "@/hooks/useCheckIfUserAuth";

const SideBarLinks = ({ ...restProps }: any) => {
  const isAuth = useCheckIfUserAuth();
  return (
    <>
      <section className="flex flex-col min-h- font-qsand">
        <nav
          className={`
            ${isAuth && "hidden"}
             flex justify-center items-center p-4 border-b`}
        >
          <SignInBtn />
        </nav>

        <nav
          className={`flex flex-col justify-center items-start gap-3 p-4 border-b`}
        >
          <LinkRenderer navLinks={NAV_LINKS} {...restProps} />
         
        </nav>

        <AuthWrapper>
          <nav className="flex flex-col mt-20 xl:mt-72">
            <LogoutAlert className="w-full border-t">
              <div className="flex items-center gap-3 p-4 w-full text-muted-foreground transition-all hover:text-primary">
                <LogOut className="text-red-400" />
                <Small className="text-red-400">Logout</Small>
              </div>
            </LogoutAlert>
          </nav>
        </AuthWrapper>
      </section>
    </>
  );
};

export default SideBarLinks;
