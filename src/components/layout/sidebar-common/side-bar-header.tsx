import Logo from "@/components/logo/Logo";
import { Separator } from "@/components/ui/separator";
import ProfilePicture from "@/components/user-info/ProfilePicture";
import UserProfileInfo from "@/components/user-info/UserProfileInfo";
import AuthWrapper from "@/components/wrapper/AuthWrapper";


import { Link } from "react-router-dom";

const SideBarHeader = () => {
  return (
    <section className="flex flex-col justify-center items-center gap-3 p-4 border-b">
      <Logo />
      <AuthWrapper>
        <Separator />
        <Link
          to={``}
          className="flex justify-center items-center gap-2 pointer-events-none select-none"
        >
        
            <ProfilePicture className="size-9" />
            <UserProfileInfo />
          
        </Link>
      </AuthWrapper>
    </section>
  );
};

export default SideBarHeader;
