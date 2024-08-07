"use client";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import useFetch from "@/hooks/ useFetch";
import { handleFormErrors } from "@/utils/form-errors";
import LoadingButton from "@mui/lab/LoadingButton";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { CiEdit } from "react-icons/ci";
import { updateUserProfile } from "../../../request/api";
import { User } from "../../../typings/api";
import SnackbarAlert, { SnackbarState } from "../../SnackBarAlert";
import UserProfileForm from "../UserProfileForm";

interface UserProfileUpdateDialogProps {
  user: User;
  refresh?: boolean;
}

const UserProfileUpdateDialog: React.FC<UserProfileUpdateDialogProps> = ({
  user,
  refresh,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [snackbarState, setSnackbarState] = useState<SnackbarState>({
    open: false,
    message: "",
    severity: "success",
  });
  const router = useRouter();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const methods = useForm<User>({
    defaultValues: user || {
      name: "",
      email: "",
      mobile: "",
    },
  });

  const {
    execute: updateExecute,
    loading,
    error,
  } = useFetch(updateUserProfile, {
    immediate: false,
  });

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const handleFormSubmit: SubmitHandler<User> = async (data) => {
    await updateExecute(user.id, data);

    if (!loading && !error) {
      setSnackbarState({
        open: true,
        message: "Profile updated successfully!",
        severity: "success",
      });
      closeDialog();
      refresh && router.refresh();
    }
  };

  useEffect(() => {
    if (error) {
      const errorMessage = error.message || "Failed to update profile!";
      setSnackbarState({
        open: true,
        message: errorMessage,
        severity: "error",
      });

      if (error.status === 400 && error.data) {
        handleFormErrors(error.data, methods.setError);
      }
    }
  }, [error]);

  const handleSnackbarClose = () => {
    setSnackbarState((prevState) => ({
      ...prevState,
      open: false,
    }));
  };

  return (
    <div className="inline-block pl-10">
      <Button
        variant="contained"
        size="medium"
        color="primary"
        startIcon={<CiEdit />}
        onClick={openDialog}
      >
        Edit
      </Button>
      <Dialog fullScreen={fullScreen} open={isDialogOpen} onClose={closeDialog}>
        <DialogTitle>Update User Profile</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter your profile information below, and click "Submit" to
            save your changes.
          </DialogContentText>

          <FormProvider {...methods}>
            <UserProfileForm onSubmit={handleFormSubmit} />
          </FormProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="secondary">
            Cancel
          </Button>
          <LoadingButton
            loading={loading}
            disabled={loading}
            onClick={methods.handleSubmit(handleFormSubmit)}
            color="primary"
            variant="contained"
          >
            {loading ? "Submitting..." : "Submit"}
          </LoadingButton>
        </DialogActions>
      </Dialog>
      <SnackbarAlert
        open={snackbarState.open}
        message={snackbarState.message}
        severity={snackbarState.severity}
        onClose={handleSnackbarClose}
      />
    </div>
  );
};

export default UserProfileUpdateDialog;
