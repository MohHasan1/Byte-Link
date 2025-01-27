// Post Button Wrapper for save and like post (idk why I made this (6 months ago) lol) //

import { Button } from "@/components/ui/button";
import { type ReactNode, type FC } from "react";


const PostButtonWrapper: FC<PostButtonProps> = ({
  children,
  liked,
  saved,
  onClick,
}) => {
  return (
    <Button
      onClick={onClick}
      variant={"ghost"}
      className={`text-muted-foreground transition-all hover:text-primary
          ${liked && "text-primary"}
          ${saved && "text-primary"}`}
    >
      {children}
    </Button>
  );
};

export default PostButtonWrapper;

interface PostButtonProps {
  children: ReactNode;
  liked?: boolean;
  saved?: boolean;
  onClick: (e: React.MouseEvent) => void;
}
