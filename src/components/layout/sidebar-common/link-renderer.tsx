// Renders sidebar btn for both mobile and desktop sidebar //

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Small } from "@/components/typography/typography";
import { type FC } from "react";
import { Link, useLocation } from "react-router-dom";
import { linkProps } from "./nav-links";
import AuthWrapper from "@/components/wrapper/AuthWrapper";
import { Contact2 } from "lucide-react";
import useCheckIfUserAuth from "@/hooks/useCheckIfUserAuth";

const LinkRenderer: FC<LinkRendererProps> = ({
  navLinks,
  isRow = false,
  ...restProps
}) => {
  const location = useLocation();
  const isAuth = useCheckIfUserAuth();
  return (
    <>
      <AuthWrapper>
        {navLinks.map((link: linkProps) => (
          <Link
            key={link.id}
            to={link.route}
            {...restProps}
            className={`flex justify-start items-center hover:text-primary rounded-sm w-full h-full
            ${!isRow && `gap-4 p-3`}
            ${isRow && "flex-col gap-1 py-2"} 
            ${
              location.pathname === link.route && "bg-muted/50 backdrop-blur-sm"
            }`}
          >
            <link.icon size={20} className="text-blue-500" />
            <Small className="text-blue-200">{link.label}</Small>
          </Link>
        ))}
      </AuthWrapper>
      {/* contact */}
      <Link
        to={"/contact-admin"}
        {...restProps}
        className={`flex justify-start items-center hover:bg-black/70 hover:border hover:backdrop-blur-3xl rounded-lg w-full h-full         
            ${
              location.pathname === "/contact-admin" &&
              "bg-muted/50 backdrop-blur-sm"
            }
            ${!isRow && `gap-4 p-3`}
            ${isRow && "flex-col gap-1 py-2"}
            ${isAuth ? "hidden" : "block"} `}
      >
        <Contact2 size={20} className="text-blue-500" />
        <Small className="text-blue-200">Connect</Small>
      </Link>
    </>
  );
};

export default LinkRenderer;

type LinkRendererProps = {
  navLinks: linkProps[];
  restProps?: any;
  isRow?: boolean;
};
