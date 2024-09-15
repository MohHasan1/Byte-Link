import { InfinitySpin } from "react-loader-spinner";

const InfinitySpinLoader = ({size=200}:{size?:number}) => {
  return (
    <>
      <InfinitySpin width={size.toString()} color="#5c81d1" />
    </>
  );
};

export default InfinitySpinLoader;
