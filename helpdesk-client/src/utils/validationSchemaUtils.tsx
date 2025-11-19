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
    .max(200, VALIDATION_MESSAGES.MAX_LENGTH("full name", 200))
    .required(VALIDATION_MESSAGES.REQUIRED_FIELD("full name")),

  email: Yup.string()
    .email(VALIDATION_MESSAGES.INVALID_EMAIL)
    .required(VALIDATION_MESSAGES.REQUIRED_FIELD("Email")),

  roleId: Yup.number().required(VALIDATION_MESSAGES.REQUIRED_FIELD("Role")),
  isActive: Yup.string().required(VALIDATION_MESSAGES.REQUIRED_FIELD("Status")),
});

export const CategorySchema = Yup.object().shape({
  categoryName: Yup.string()
    .max(100, VALIDATION_MESSAGES.MAX_LENGTH("Category Name", 100))
    .required(VALIDATION_MESSAGES.REQUIRED_FIELD("Category Name")),
});

export const PrioritySchema = Yup.object().shape({
  priorityName: Yup.string()
    .trim()
    .required(VALIDATION_MESSAGES.REQUIRED_FIELD("Priority"))
    .max(50, VALIDATION_MESSAGES.MAX_LENGTH("Priority Name", 50)),
});

export const StatusSchema = Yup.object().shape({
  statusName: Yup.string()
    .trim()
    .required(VALIDATION_MESSAGES.REQUIRED_FIELD("Status"))
    .max(50, VALIDATION_MESSAGES.MAX_LENGTH("Status Name", 50)),
});
