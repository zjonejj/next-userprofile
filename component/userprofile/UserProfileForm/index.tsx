import { Button, TextField } from "@mui/material";
import React from "react";
import { SubmitHandler, useFormContext } from "react-hook-form";
import { User } from "../../../typings/api";

interface UserProfileFormProps {
  onSubmit: SubmitHandler<User>;
}

const UserProfileForm: React.FC<UserProfileFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext<User>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <TextField
          label="Name"
          fullWidth
          margin="normal"
          {...register("name", { required: "Name is required" })}
          error={!!errors.name}
          helperText={errors.name ? errors.name.message : ""}
        />
      </div>
      <div>
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-.]+\.[a-zA-Z0-9-.]+$/,
              message: "Enter a valid email",
            },
          })}
          error={!!errors.email}
          helperText={errors.email ? errors.email.message : ""}
        />
      </div>
      <div>
        <TextField
          label="Mobile"
          fullWidth
          margin="normal"
          {...register("mobile", { required: "Mobile number is required" })}
          error={!!errors.mobile}
          helperText={errors.mobile ? errors.mobile.message : ""}
        />
      </div>
      <Button type="submit" style={{ display: "none" }}>
        Submit
      </Button>
    </form>
  );
};

export default UserProfileForm;
