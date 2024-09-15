import { LogOut } from "lucide-react";
import LinkRenderer from "./link-renderer";
import { LogoutAlert } from "@/components/LogOutAlert";
import { Small } from "@/components/typography/typography";
import { NAVLINKS } from "./nav-links";

const SideBarLinks = ({ ...restProps }: any) => {
  return (
    <>
      <section className="flex flex-col min-h-dvh">
        <nav
          className={`flex flex-col justify-center items-start gap-3 p-4 border-b`}
        >
          <LinkRenderer navLinks={NAVLINKS} {...restProps} />
        </nav>

        <nav className="flex flex-col mt-20 xl:mt-72">
          <LogoutAlert className="w-full border-t">
            <div className="flex items-center gap-3 p-4 w-full text-muted-foreground transition-all hover:text-primary">
              <LogOut />
              <Small>Logout</Small>
            </div>
          </LogoutAlert>
        </nav>
      </section>
    </>
  );
};

export default SideBarLinks;
