import * as Yup from "yup";
import { VALIDATION_MESSAGES } from "./validationMessages";
import { REGEX } from "./regex";

export const filterValidationSchema = Yup.object({
  priorityId: Yup.string(),
  statusId: Yup.string(),
  formDate: Yup.string(),
  toDate: Yup.string().test(
    "date-order",
    "To Date must be after Form Date",
    function (value) {
      const { formDate } = this.parent;
      if (!formDate || !value) return true;
      return new Date(value) >= new Date(formDate);
    }
  ),
});

// ✅ Validation Schema
export const TicketSchema = Yup.object().shape({
  title: Yup.string()
    .trim()
    .required(VALIDATION_MESSAGES.REQUIRED_FIELD("Title"))
    .max(200, VALIDATION_MESSAGES.MAX_LENGTH("Title", 200)),

  description: Yup.string()
    .trim()
    .required(VALIDATION_MESSAGES.REQUIRED_FIELD("Description"))
    .max(500, VALIDATION_MESSAGES.MAX_LENGTH("Description", 500)),

  priorityId: Yup.number()
    .required(VALIDATION_MESSAGES.REQUIRED_FIELD("Priority"))
    .typeError(VALIDATION_MESSAGES.REQUIRED_FIELD("Priority")),

  categoryId: Yup.number()
    .required(VALIDATION_MESSAGES.REQUIRED_FIELD("Category"))
    .typeError(VALIDATION_MESSAGES.REQUIRED_FIELD("Category")),
});

export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email(VALIDATION_MESSAGES.INVALID_EMAIL)
    .required(VALIDATION_MESSAGES.REQUIRED_FIELD("Email")),

  password: Yup.string()
    .matches(REGEX.PASSWORD, VALIDATION_MESSAGES.INVALID_PASSWORD)
    .required(VALIDATION_MESSAGES.REQUIRED_FIELD("Password")),
});

export const signUpValidationSchema = Yup.object({
  fullName: Yup.string()
    .required(VALIDATION_MESSAGES.REQUIRED_FIELD("Full Name"))
    .max(100, VALIDATION_MESSAGES.MAX_LENGTH("Full Name", 100))
    .min(2, VALIDATION_MESSAGES.MIN_LENGTH("Full Name", 2)),

  email: Yup.string()
    .required(VALIDATION_MESSAGES.REQUIRED_FIELD("Email"))
    .email(VALIDATION_MESSAGES.INVALID_EMAIL)
    .max(100, VALIDATION_MESSAGES.MAX_LENGTH("Email", 100)),

  password: Yup.string()
    .required(VALIDATION_MESSAGES.REQUIRED_FIELD("Password"))
    .min(8, VALIDATION_MESSAGES.MIN_LENGTH("Password", 8))
    .max(50, VALIDATION_MESSAGES.MAX_LENGTH("Password", 50))
    .matches(REGEX.PASSWORD, VALIDATION_MESSAGES.INVALID_PASSWORD),

  confirmPassword: Yup.string()
    .required(VALIDATION_MESSAGES.REQUIRED_FIELD("Confirm Password"))
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

export const UserSchema = Yup.object().shape({
  fullName: Yup.string()
    .max(200, "Max 200 characters allowed")
    .required("Full Name is required"),

  email: Yup.string().email("Invalid email").required("Email is required"),

  roleId: Yup.number().required("Role is required"),
});
