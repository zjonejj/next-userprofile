import Joi from "joi";
import { UseFormSetError } from "react-hook-form";

export const handleFormErrors = (
  errorData: Joi.ValidationErrorItem[],
  setError: UseFormSetError<any>
) => {
  if (errorData) {
    errorData.forEach((error) => {
      const field = error.path[0];
      const message = error.message.replace(/"/g, "");
      // 设置错误到表单
      setError(String(field), {
        type: "manual",
        message: message,
      });
    });
  }
};
