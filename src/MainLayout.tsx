import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import QueryProvider from "./lib/react-query/QueryProvider";
import { ThemeProvider } from "./theme/theme-provider";

const MainLayout = () => {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        {/* <AuthCtxProvider> */}
        <QueryProvider>
          <Outlet />
          <Toaster richColors   position="top-right" />
        </QueryProvider>
        {/* </AuthCtxProvider> */}
      </ThemeProvider>
    </>
  );
};

export default MainLayout;
