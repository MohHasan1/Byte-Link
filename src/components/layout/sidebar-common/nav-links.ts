import { House, BadgePlus, CircleUser, LucideProps } from "lucide-react";

export const NAV_LINKS = [
  {
    id: 0,
    label: "Home",
    route: "/",
    icon: House,
  },
  // {
  //   id: 1,
  //   label: "Explore",
  //   route: "/explore",
  //   icon: <Telescope />,
  // },
  // {
  //   id: 2,
  //   label: "People",
  //   route: "/people",
  //   icon: <Users />,
  // },
  // {
  //   id: 3,
  //   label: "Saved",
  //   route: "/saved",
  //   icon: <Pin />,
  // },
  {
    id: 4,
    label: "Create",
    route: "/create-post",
    icon: BadgePlus,
  },
  {
    id: 5,
    label: "Contact",
    route: "/contact-admin",
    icon: CircleUser,
  },
];

export type linkProps = {
  id: number;
  label: string;
  route: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
};
