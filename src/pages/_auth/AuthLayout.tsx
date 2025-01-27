
import AuthCtxProvider from "@/context/AuthCtx";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  // const isAuthenticated = false;

  return (
    <>
      {/* {isAuthenticated && <Navigate to="/" />} */}
      <AuthCtxProvider>
        <main className="h-dvh flex  font-qsand">
          <section className="flex flex-col flex-1 justify-center items-center p-10 overflow-y-auto">
            <Outlet />
          </section>
          <img
            src="/assets/images/cat1.jpg"
            alt="Authentication image"
            className="hidden xl:block h-full w-1/2 object-cover bg-no-repeat"
          />
        </main>
      </AuthCtxProvider>
    </>
  );
};

export default AuthLayout;

/*
Note: 
- Flex takes up all the available height by default.
- flex-1 means take up all the available space.
*/
