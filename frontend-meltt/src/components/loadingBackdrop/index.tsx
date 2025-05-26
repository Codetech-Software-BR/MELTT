import { Backdrop, CircularProgress } from "@mui/material";

type LoadingBackdropProps = {
    open: boolean;
    handleClose: () => void;
}

const LoadingBackdrop = ({ open, handleClose }: LoadingBackdropProps) => {
  return (
    <Backdrop
      sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
      open={open}
      onClick={handleClose}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default LoadingBackdrop;
