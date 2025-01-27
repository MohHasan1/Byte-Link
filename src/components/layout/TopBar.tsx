import { Card } from "../ui/card";
import Logo from "../logo/Logo";
import MobileSideBar from "./mobile-sidebar/mobile-side-bar";

const TopBar = () => {
  return (
    <Card className="flex justify-between items-center px-5 rounded-full h-11 my-2 w-[99%] mx-auto bg-card/20 backdrop-blur-3xl">
      <Logo />

      <div className="flex justify-center items-center gap-2">
        <MobileSideBar />
      </div>
    </Card>
  );
};

export default TopBar;
