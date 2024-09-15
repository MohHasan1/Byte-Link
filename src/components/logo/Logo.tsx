
import { Link } from "react-router-dom";
import { P } from "../typography/typography";

const Logo = () => {
  return (
    <Link to={"/"} className="flex gap-2 ">
      <img src="/assets/icons/byteLink.svg" alt="Byte Link Logo." />
      <P>ByteLink</P>
    </Link>
  );
};

export default Logo;
