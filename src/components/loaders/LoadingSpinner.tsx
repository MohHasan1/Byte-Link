import { Loader } from "lucide-react";

type LoadingSpinnerProps = {
  className?: string;
  isFetching: boolean;
};

const LoadingSpinner = ({ isFetching, className }: LoadingSpinnerProps) => {
  return (
    <div
      className={`transition-opacity duration-500 
    ${isFetching ? "opacity-100" : "opacity-0"} `}
    >
      {isFetching && <Loader className={`${className} animate-spin`} />}
    </div>
  );
};

export default LoadingSpinner;
