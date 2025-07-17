import { Card } from "../ui/card";
import Logo from "../logo/Logo";
import MobileSideBar from "./mobile-sidebar/mobile-side-bar";

const TopBar = () => {
  return (
    <Card className="fixed z-10 shadow-lg backdrop-blur-3xl text-center py-7 bg-gradient-to-r from-blue-950/30 via-blue-800/30 to-blue-950/30 flex justify-between items-center px-5 rounded-full h-11 my-2 w-[99%] mx-auto ">
      <Logo />

      <div className="flex justify-center items-center gap-2">
        <MobileSideBar />
      </div>
    </Card>
  );
};

export default TopBar;
