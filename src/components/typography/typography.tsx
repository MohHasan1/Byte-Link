import { type ReactNode } from "react";

type typographyProps = {
  children: ReactNode;
  className?: string | number | undefined;
};

export const H1 = ({ children, className }: typographyProps) => {
  return (
    <h1
      className={`scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl ${className}`}
    >
      {children}
    </h1>
  );
};

export const H2 = ({ children, className }: typographyProps) => {
  return (
    <h2
      className={`scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 ${className}`}
    >
      {children}
    </h2>
  );
};

export const H3 = ({ children, className }: typographyProps) => {
  return (
    <h3
      className={`scroll-m-20 text-2xl font-semibold tracking-tight ${className}`}
    >
      {children}
    </h3>
  );
};

export const H4 = ({ children, className }: typographyProps) => {
  return (
    <div
      className={`scroll-m-20 text-xl font-semibold tracking-tight ${className}`}
    >
      {children}
    </div>
  );
};

export const P = ({ children, className }: typographyProps) => {
  return (
    <p className={`leading-7 ${className}`}>
      {children}
    </p>
  );
};

export const Small = ({ children, className }: typographyProps) => {
  return (
    <small className={`text-sm font-medium leading-none ${className}`}>
      {children}
    </small>
  );
};

export const Large = ({ children, className }: typographyProps) => {
  return <div className={`text-lg font-semibold ${className}`}>{children}</div>;
};

export const Muted = ({ children, className }: typographyProps) => {
  return (
    <div className={`text-sm text-muted-foreground ${className}`}>
      {children}
    </div>
  );
};

export const Lead = ({ children, className }: typographyProps) => {
  return (
    <div className={`"text-xl text-muted-foreground ${className}`}>
      {children}
    </div>
  );
};

export const Inline = ({ children, className }: typographyProps) => {
  return (
    <code
      className={`elative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold ${className}`}
    >
      {children}
    </code>
  );
};
