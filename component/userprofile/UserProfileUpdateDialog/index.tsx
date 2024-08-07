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

import { ErrorResponse } from "@/typings/fetch";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { CiEdit } from "react-icons/ci";
import { updateUserProfile } from "../../../request/api";
import { User } from "../../../typings/api";
import { handleFormErrors } from "../../../utils/form-errors";
import SnackbarAlert, { SnackbarState } from "../../SnackBarAlert";
import UserProfileForm from "../UserProfileForm";

interface UserProfileUpdateDialogProps {
  user: User;
  handleUpdatedUser?: () => void;
}

const UserProfileUpdateDialog: React.FC<UserProfileUpdateDialogProps> = ({
  user,
  handleUpdatedUser,
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

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const handleFormSubmit: SubmitHandler<User> = async (data) => {
    try {
      const user = await updateUserProfile("1", data);

      console.log("Response:", user);
      handleUpdatedUser && handleUpdatedUser();
      setSnackbarState({
        open: true,
        message: "Profile updated successfully!",
        severity: "success",
      });
      closeDialog();
      router.refresh();
    } catch (error) {
      if (
        (error as ErrorResponse) &&
        (error as ErrorResponse).status === 400 &&
        (error as ErrorResponse).data
      ) {
        handleFormErrors((error as ErrorResponse).data, methods.setError);
      } else {
        var errorMessage = (error as ErrorResponse)
          ? (error as ErrorResponse).message
          : "Failed to update profile!";

        setSnackbarState({
          open: true,
          message: errorMessage,
          severity: "error",
        });
      }
    }
  };

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
            Please enter your profile information below, and click "Subscribe"
            to save your changes.
          </DialogContentText>

          <FormProvider {...methods}>
            <UserProfileForm onSubmit={handleFormSubmit} />
          </FormProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={methods.handleSubmit(handleFormSubmit)}
            color="primary"
            variant="contained"
          >
            Submit
          </Button>
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
