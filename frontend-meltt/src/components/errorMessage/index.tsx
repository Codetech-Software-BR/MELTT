import { IoWarning } from "react-icons/io5";

const ErrorMessage = ({ message }: { message: string }) => {
  return (
    <div className="flex flex-row items-center gap-1">
      <IoWarning className="text-red-500" size={12} />
      <small style={{ color: "#EB420E" }}>{message}</small>
    </div>
  );
};

export default ErrorMessage;
