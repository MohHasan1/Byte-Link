import { Card } from "../ui/card";
import MobileSideBar from "./side-bar/mobile-side-bar";
import Logo from "../logo/Logo";

const TopBar = () => {
  return (
    <Card className="flex justify-between items-center px-5 rounded-full h-11 mt-2 w-[99%] mx-auto">
      <Logo />

      <div className="flex justify-center items-center gap-2">
        <MobileSideBar />
      </div>
    </Card>
  );
};

export default TopBar;
