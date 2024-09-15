import MobileBottomBar from "@/components/layout/side-bar/mobile-bottom-bar";
import SideBar from "@/components/layout/side-bar/side-bar";
import TopBar from "@/components/layout/TopBar";
import LikePostCtxProvider from "@/context/PostCtx";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <>
      <section>
        <header className="block xl:hidden">
          <TopBar />
        </header>
        <main className="flex">
          <div className=" mb-24 xl:mb-10 w-full xl:w-[85%]">
            <LikePostCtxProvider>
              <Outlet />
            </LikePostCtxProvider>
          </div>
          <div className="hidden xl:block">
            <SideBar />
          </div>
        </main>
        <footer className="block xl:hidden">
          <MobileBottomBar />
        </footer>
      </section>
    </>
  );
};

export default RootLayout;
