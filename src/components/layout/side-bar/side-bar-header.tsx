import Logo from "@/components/logo/Logo";
import { Separator } from "@/components/ui/separator";
import ProfilePicture from "@/components/user-info/ProfilePicture";
import UserProfileInfo from "@/components/user-info/UserProfileInfo";
// import { useAuthctx } from "@/context/AuthCtx";

import { Link } from "react-router-dom";

const SideBarHeader = () => {
  // const { user } = useAuthctx();
  return (
    <section className="flex flex-col justify-center items-center gap-3 p-4 border-b">
      <Logo />
      <Separator />
      <Link
        to={``}
        // to={`/profile/${user?.id}`}
        className="flex justify-center items-center gap-2"
      >
        <ProfilePicture className="size-9" />
        <UserProfileInfo />
      </Link>
    </section>
  );
};

export default SideBarHeader;
