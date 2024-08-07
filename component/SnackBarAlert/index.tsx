import { Alert, AlertColor, Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";

export interface SnackbarState {
  open: boolean;
  message: string;
  severity: AlertColor;
}

interface SnackbarAlertProps extends SnackbarState {
  onClose?: () => void;
  autoHideDuration?: number;
}

const SnackbarAlert: React.FC<SnackbarAlertProps> = ({
  open,
  message,
  severity,
  onClose,
  autoHideDuration = 5000,
}) => {
  const [openState, setOpenState] = useState(open);

  useEffect(() => {
    setOpenState(open);
  }, [open]);

  const handleClose = () => {
    setOpenState(false);
    onClose && onClose();
  };

  return (
    <Snackbar
      open={openState}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarAlert;
