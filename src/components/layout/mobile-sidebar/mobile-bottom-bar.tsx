import { Card } from "@/components/ui/card";
import LinkRenderer from "../sidebar-common/link-renderer";
import { NAV_LINKS } from "../sidebar-common/nav-links";
import SignInBtn from "@/components/SignInBtn";
import useCheckIfUserAuth from "@/hooks/useCheckIfUserAuth";

const MobileBottomBar = () => {
  const isAuth = useCheckIfUserAuth();

  return (
    <Card className="border-none fixed bottom-0 left-0 right-0 rounded-none backdrop-blur-3xl bg-black/20">
      <div
        className={`
          ${isAuth && "hidden"} flex justify-center items-center p-1 my-auto`}
      >
        <SignInBtn text="Link-in/Link-up to explore more!" />
      </div>

      <nav
        className={`${!isAuth && "hidden"} flex flex-row justify-between p-1`}
      >
        <LinkRenderer navLinks={NAV_LINKS} isRow={true} />
      </nav>
    </Card>
  );
};

export default MobileBottomBar;
