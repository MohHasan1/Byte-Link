import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import QueryProvider from "./lib/react-query/QueryProvider";
import { ThemeProvider } from "./theme/theme-provider";
import AuthCtxProvider from "./context/AuthCtx";

const MainLayout = () => {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AuthCtxProvider>
          <QueryProvider>
            <Outlet />
            <Toaster closeButton richColors position="top-left" />
          </QueryProvider>
        </AuthCtxProvider>
      </ThemeProvider>
    </>
  );
};

export default MainLayout;
