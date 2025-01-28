
import { Link } from "react-router-dom";
import { P } from "../typography/typography";

const Logo = () => {
  return (
    <Link to={"/"} className="flex items-center justify-start gap-2 ">
      <img src="/assets/icons/byteLink.svg" alt="Byte Link Logo."   loading="lazy"  />
      <P className="font-qsand font-medium uppercase text-blue-300">ByteLink</P>
    </Link>
  );
};

export default Logo;
