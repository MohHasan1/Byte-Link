// This component renders other user info (user that posts on the app and is not you): name, avatar, username and location
import { FC } from "react";
import { Link } from "react-router-dom";
import { CardTitle, CardDescription } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const OtherPostUserInfo: FC<Props> = ({
  userimg,
  name,
  username,
  location,
}) => {
  return (
    <Link to={``} className="flex gap-4 pointer-events-none">
      <Avatar className="size-12 rounded-xl ring-2 ring-sky-500/50">
        <AvatarImage src={userimg} alt="profile picture" />
        <AvatarFallback>{name.charAt(0).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-1">
        <CardTitle className="text-lg">{name}</CardTitle>
        <CardDescription>
          @{username}
          {location ? `, ${location}` : ""}
        </CardDescription>
      </div>
    </Link>
  );
};

type Props = {
  userimg?: string;
  name: string;
  username: string;
  location?: string;
};

export default OtherPostUserInfo;
