import { Outlet } from "react-router-dom";
import AuthCtxProvider from "./context/AuthCtx";
import QueryProvider from "./lib/react-query/QueryProvider";
import { ThemeProvider } from "./theme/theme-provider";

const MainLayout = () => {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AuthCtxProvider>
          <QueryProvider>
            <Outlet />
          </QueryProvider>
        </AuthCtxProvider>
      </ThemeProvider>
    </>
  );
};

export default MainLayout;
