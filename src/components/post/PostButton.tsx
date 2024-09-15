import { ReactNode, type FC } from "react";
import { Button } from "../ui/button";

const PostButton: FC<PostButtonProps> = ({
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

export default PostButton;

interface PostButtonProps {
  children: ReactNode;
  liked?: boolean;
  saved?: boolean;
  onClick: (e: React.MouseEvent) => void;
}
