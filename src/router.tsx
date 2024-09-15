import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "./pages/_auth/AuthLayout";
import RootLayout from "./pages/_root/RootLayout";
import { SignInForm, SignUpForm } from "./pages/_auth/auth-routes";
import {
  ContactPage,
  CreatePost,
  EditPost,
  Home,
  ViewPost,
} from "./pages/_root/root-routes";
import MainLayout from "./MainLayout";

const router = createBrowserRouter([
  /* Public Routes */
  {
    path: "/auth",
    element: <MainLayout />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          { path: "sign-in", element: <SignInForm /> },
          { path: "sign-up", element: <SignUpForm /> },
        ],
      },
    ],
  },

  /* Private Routes */
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <RootLayout />,
        children: [
          { index: true, element: <Home /> },
          // { path: "/explore", element: <Explore /> },
          // { path: "/all-users", element: <AllUsers /> },
          // { path: "/saved", element: <Saved /> },
          // { path: "/profile/:userId", element: <Profile /> },
          // { path: "/update-profile/:", element: <UpdateProfile /> },
          { path: "/create-post", element: <CreatePost /> },
          { path: "/edit-post/:postId", element: <EditPost /> },
          { path: "/posts/:postId", element: <ViewPost /> },
          { path: "/contact-admin", element: <ContactPage /> },
        ],
      },
    ],
  },
]);

export default router;
