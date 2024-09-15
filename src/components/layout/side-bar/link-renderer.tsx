import { Small } from "@/components/typography/typography";
import { type FC } from "react";
import { Link, useLocation } from "react-router-dom";
import { linkProps } from "./nav-links";

const LinkRenderer: FC<LinkRendererProps> = ({
  navLinks,
  isRow = false,
  ...restProps
}) => {
  const location = useLocation();
  return (
    <>
      {navLinks.map((link: linkProps) => (
        <Link
          key={link.id}
          to={link.route}
          {...restProps}
          className={`flex justify-start items-center text-muted-foreground transition-all hover:text-primary rounded-sm w-full h-full
            ${!isRow && `gap-4  p-3`}
            ${isRow && "flex-col gap-1 p-2"} 
            ${location.pathname === link.route && "bg-muted"}`}
        >
          <div>{link.icon}</div>
          <Small>{link.label}</Small>
        </Link>
      ))}
    </>
  );
};

export default LinkRenderer;

type LinkRendererProps = {
  navLinks: linkProps[];
  restProps?: any;
  isRow?: boolean;
};
