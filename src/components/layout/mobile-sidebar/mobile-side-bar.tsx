import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import SideBarHeader from "../sidebar-common/side-bar-header";
import SideBarLinks from "../desktop-sidebar/side-bar-links";


const MobileSideBar = () => {
  return (
    <aside className="block xl:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="shrink-0 xl:hidden">
            <Menu className="h-5 w-5 text-blue-300" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>

        <SheetContent
          side="right"
          className="p-0 fixed min-h-screen flex flex-col"
        >
          <SheetHeader>
            <SheetTitle>
              <SideBarHeader />
            </SheetTitle>
          </SheetHeader>

          <SheetClose asChild>
            <SideBarLinks />
          </SheetClose>
        </SheetContent>
      </Sheet>
    </aside>
  );
};

export default MobileSideBar;
