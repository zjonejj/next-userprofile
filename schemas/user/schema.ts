import Joi, { ValidationError } from "joi";

const userUpdateSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    "string.base": "Username should be a type of text",
    "string.empty": "Username cannot be an empty field",
    "string.min": "Username should have a minimum length of {#limit}",
    "string.max": "Username should have a maximum length of {#limit}",
    "any.required": "Username is a required field",
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .messages({
      "string.email": "Please enter a valid email address",
      "string.empty": "Email cannot be an empty field",
      "any.required": "Email is a required field",
    })
    .custom((val, helper) => {
      if (!val.endsWith("arcblock.com")) {
        return helper.error("Email must end with arcblock.com");
      }
      return val;
    })
    .required(),
  mobile: Joi.string()
    .pattern(new RegExp("^\\+?[1-9]\\d{1,14}$"))
    .required()
    .messages({
      "string.pattern.base":
        "Phone number must be a valid international phone number",
      "string.empty": "Phone number cannot be an empty field",
      "any.required": "Phone number is a required field",
    }),
}).unknown(true);

export function validateUserUpdate(user: any) {
  const { error } = userUpdateSchema.validate(user);
  if (error) {
    throw error as ValidationError;
  }
}
