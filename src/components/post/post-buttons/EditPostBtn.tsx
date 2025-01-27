import { useAuthctx } from "@/context/AuthCtx";
import { FilePenLine } from "lucide-react";
import { Link } from "react-router-dom";
import { FC } from "react";
import ToolTip from "@/components/ToolTip";

const EditPostBtn: FC<Props> = ({ postId, userId }) => {
  const { user } = useAuthctx();

  return (
    <div>
      {userId === user?.id && (
        <ToolTip tip="Edit the post">
          <Link
            to={`edit-post/${postId}`}
            className="text-muted-foreground transition-all hover:text-primary"
          >
            <FilePenLine />
          </Link>
        </ToolTip>
      )}
    </div>
  );
};

type Props = {
  userId: string;
  postId: string;
};

export default EditPostBtn;
