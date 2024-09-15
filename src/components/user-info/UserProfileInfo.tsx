import { Lead, Small, Muted } from "../typography/typography";
import { useAuthctx } from "@/context/AuthCtx";

const UserProfileInfo = ({
  showName = true,
  showEmail = true,
}: UserProfileInfoProps) => {
  const { user } = useAuthctx();

  return (
    <>
      <section className="flex flex-wrap flex-col justify-center items-start">
        {showName && (
          <Lead>
            <Small>{user?.name}</Small>
          </Lead>
        )}

        {showEmail && (
          <Muted>
            <Small>@{user?.username}</Small>
          </Muted>
        )}
      </section>
    </>
  );
};

export default UserProfileInfo;

type UserProfileInfoProps = {
  showName?: boolean;
  showEmail?: boolean;
};
