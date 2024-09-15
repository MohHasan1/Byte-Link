import { type ReactNode } from "react";

const ContentWrapper = ({ children, className }: { children: ReactNode , className?:string}) => {
  return <div className={`w-full p-0 md:w-[85%] ${className}`}>{children}</div>;
};

export default ContentWrapper;
