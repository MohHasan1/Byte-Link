import SideBarHeader from "../sidebar-common/side-bar-header";
import SideBarLinks from "./side-bar-links";
import { Card } from "@/components/ui/card";

const SideBar = () => {
  return (
    <>
      <aside>
        <Card className="h-full xl:w-[15%] rounded-none fixed">
          <SideBarHeader />
          <SideBarLinks />
        </Card>
      </aside>
    </>
  );
};

export default SideBar;
