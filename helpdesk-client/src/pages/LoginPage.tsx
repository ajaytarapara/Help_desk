import {
  LockOutlined,
  Email,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../core/store";
import { ApiResponse } from "../features/auth/types";
import { loginUser } from "../features/auth/authThunk";
import { Roles, Routes } from "../utils/constant";
import {
  getAllAgentThunk,
  getAllCategoryThunk,
  getAllPriorityThunk,
  getAllStatusThunk,
} from "../features/dropDown/dropDownThunk";
import { getUserRole } from "../utils/authUtils";
import { loginValidationSchema } from "../utils/validationSchemaUtils";

import {
  ContactAdmin,
  Footer,
  FooterText,
  FormWrapper,
  HeaderBox,
  IconWrapper,
  SubmitButton,
  Subtitle,
  Title,
} from "../Components/common";
import FormField from "../Components/common/FormField";
import AuthLayout from "../Components/layouts/AuthLayout";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      const result = await dispatch(loginUser(values));
      const token = (result.payload as ApiResponse<string>)?.data;
      if (token) {
        localStorage.setItem("token", token);
        navigate(Routes.USER_DASHBOARD);
        getAllLookUpData();
        if (getUserRole() !== Roles.USER) {
          await dispatch(getAllAgentThunk());
        }
      }
      setSubmitting(false);
    },
  });

  const getAllLookUpData = async () => {
    await dispatch(getAllStatusThunk());
    await dispatch(getAllPriorityThunk());
    await dispatch(getAllCategoryThunk());
  };

  return (
    <AuthLayout>
      <HeaderBox>
        <IconWrapper>
          <LockOutlined sx={{ fontSize: 32, color: "#ffffff" }} />
        </IconWrapper>
        <Title variant="h4">Welcome Back</Title>
        <Subtitle variant="body1">
          Sign in to access your HelpDesk portal
        </Subtitle>
      </HeaderBox>

      <FormWrapper onSubmit={formik.handleSubmit}>
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
          endIcon={({ show }) => (show ? <VisibilityOff /> : <Visibility />)}
          toggleable
          required
        />
        <SubmitButton type="submit" fullWidth>
          Sign In
        </SubmitButton>
      </FormWrapper>

      <Footer>
        <FooterText variant="body2">
          Don’t have an account?{" "}
          <ContactAdmin onClick={() => navigate(Routes.SIGN_UP)}>
            Sign up
          </ContactAdmin>
        </FooterText>
      </Footer>
    </AuthLayout>
  );
};

export default Login;
