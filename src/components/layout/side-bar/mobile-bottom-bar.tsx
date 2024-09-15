import { Card } from "@/components/ui/card";
import LinkRenderer from "./link-renderer";
import { NAVLINKS } from "./nav-links";

const MobileBottomBar = () => {
  return (
    <Card className="fixed bottom-0 left-0 right-0 rounded-none">
      <nav className={`flex flex-row justify-between p-1 transition`}>
        <LinkRenderer navLinks={NAVLINKS} isRow={true} />
      </nav>
    </Card>
  );
};

export default MobileBottomBar;
