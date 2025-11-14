import React, { JSX, useState } from "react";
import { InputAdornment, IconButton, TextFieldProps } from "@mui/material";
import { FormikProps } from "formik";
import { StyledTextField } from "./ui/AuthStyles";

interface FormFieldProps extends Omit<TextFieldProps, "name"> {
  formik: FormikProps<any>;
  name: string;
  label: string;
  icon?: React.ElementType;
  endIcon?: ({ show }: { show: boolean }) => JSX.Element;
  toggleable?: boolean;
  required?: boolean;
  type?: string;
  select?: boolean;
  multiline?: boolean;
  rows?: number;
  placeholder?: string;
  children?: React.ReactNode; // for MenuItem options
}

const FormField: React.FC<FormFieldProps> = ({
  formik,
  name,
  label,
  icon: Icon,
  endIcon,
  toggleable = false,
  required = false,
  type = "text",
  select = false,
  multiline = false,
  rows,
  placeholder,
  children,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const fieldProps = formik.getFieldProps(name);

  const error = formik.touched[name] && Boolean(formik.errors[name]);

  const helperText =
    formik.touched[name] && typeof formik.errors[name] === "string"
      ? (formik.errors[name] as string)
      : undefined;

  const inputType =
    toggleable && type === "password"
      ? showPassword
        ? "text"
        : "password"
      : type;

  return (
    <StyledTextField
      fullWidth
      label={label}
      type={inputType}
      select={select}
      multiline={multiline}
      rows={rows}
      {...fieldProps}
      error={error}
      helperText={helperText}
      placeholder={placeholder || label}
      InputProps={{
        startAdornment: Icon ? (
          <InputAdornment position="start">
            <Icon sx={{ color: "#0ea5e9" }} />
          </InputAdornment>
        ) : undefined,
        endAdornment:
          toggleable && endIcon ? (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)}>
                {endIcon({ show: showPassword })}
              </IconButton>
            </InputAdornment>
          ) : undefined,
      }}
      InputLabelProps={{ required }}
      {...rest}>
      {select && children}
    </StyledTextField>
  );
};

export default FormField;
