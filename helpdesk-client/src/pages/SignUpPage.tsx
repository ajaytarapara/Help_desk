import {
  PersonAdd,
  Email,
  LockOutlined,
  Visibility,
  VisibilityOff,
  Person,
} from "@mui/icons-material";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../core/store";
import { ApiResponse, User } from "../features/auth/types";
import { registerUser } from "../features/auth/authThunk";
import { Routes } from "../utils/constant";
import { signUpValidationSchema } from "../utils/validationSchemaUtils";

import {
  HeaderBox,
  IconWrapper,
  Title,
  Subtitle,
  FormWrapper,
  SubmitButton,
  Footer,
  FooterText,
  ContactAdmin,
} from "../Components/common";
import FormField from "../Components/common/FormField";
import AuthLayout from "../Components/layouts/AuthLayout";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signUpValidationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      const result = await dispatch(registerUser(values));
      const response = result.payload as ApiResponse<User>;
      if (response?.success) {
        navigate(Routes.LOGIN);
      }
      setSubmitting(false);
    },
  });

  return (
    <AuthLayout>
      <HeaderBox>
        <IconWrapper>
          <PersonAdd sx={{ fontSize: 32, color: "#ffffff" }} />
        </IconWrapper>
        <Title variant="h4">Create Account</Title>
        <Subtitle variant="body1">
          Sign up to access your HelpDesk portal
        </Subtitle>
      </HeaderBox>

      {/* Form */}
      <FormWrapper onSubmit={formik.handleSubmit}>
        <FormField
          formik={formik}
          name="fullName"
          label="Full Name"
          required
          icon={Person}
        />
        <FormField
          formik={formik}
          name="email"
          label="Email Address"
          icon={Email}
          required
        />
        <FormField
          formik={formik}
          name="password"
          label="Password"
          icon={LockOutlined}
          toggleable
          endIcon={({ show }) => (show ? <VisibilityOff /> : <Visibility />)}
          type="password"
          required
        />
        <FormField
          formik={formik}
          name="confirmPassword"
          label="Confirm Password"
          icon={LockOutlined}
          toggleable
          endIcon={({ show }) => (show ? <VisibilityOff /> : <Visibility />)}
          type="password"
          required
        />
        <SubmitButton type="submit" fullWidth>
          Sign Up
        </SubmitButton>
      </FormWrapper>

      {/* Footer */}
      <Footer>
        <FooterText variant="body2">
          Already have an account?{" "}
          <ContactAdmin onClick={() => navigate(Routes.LOGIN)}>
            Sign In
          </ContactAdmin>
        </FooterText>
      </Footer>
    </AuthLayout>
  );
};

export default Signup;
