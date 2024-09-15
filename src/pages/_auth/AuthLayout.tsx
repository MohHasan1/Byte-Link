
import { Toaster } from "@/components/ui/toaster";
import { Outlet, Navigate } from "react-router-dom";

const AuthLayout = () => {
  const isAuthenticated = false;

  return (
    <>
      {isAuthenticated && <Navigate to="/" />}
      {!isAuthenticated && (
        <main className="h-screen flex">
          <Toaster />
          <section className="flex flex-col flex-1 justify-center items-center p-10">
            <Outlet />
          </section>
          <img
            src="/assets/images/cat1.jpg"
            alt="Authentication image"
            className="hidden xl:block h-full w-1/2 object-cover bg-no-repeat"
          />
        </main>
      )}
    </>
  );
};

export default AuthLayout;

/*
Note: 
- Flex takes up all the available height by default.
- flex-1 means take up all the available space.
*/
