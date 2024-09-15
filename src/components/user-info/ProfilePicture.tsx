import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthctx } from "@/context/AuthCtx";

const ProfilePicture = ({ className }: ProfilePictureProps) => {
  const { user } = useAuthctx();

  return (
    <Avatar className={`size-8 ring-1 ring-orange-500/50 ${className}`}>
      <AvatarImage src={user?.imageUrl} alt="profile picture" />
      <AvatarFallback>O</AvatarFallback>
    </Avatar>
  );
};

export default ProfilePicture;

type ProfilePictureProps = {
  className?: string;
};
