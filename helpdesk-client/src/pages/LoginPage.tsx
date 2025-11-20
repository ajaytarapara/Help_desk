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
import { ApiResponse, UserInfo } from "../features/auth/types";
import { fetchUser, loginUser } from "../features/auth/authThunk";
import { Roles, Routes } from "../utils/constant";
import {
  getAllCategoryThunk,
  getAllPriorityThunk,
  getAllStatusThunk,
} from "../features/dropDown/dropDownThunk";
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
      if (!result.payload || !(result.payload as ApiResponse<any>).success) {
        setSubmitting(false);
        return;
      }
      const userResult = await dispatch(fetchUser());
      const user = userResult.payload as ApiResponse<UserInfo>;
      if (user?.data) {
        if (user?.data.role === Roles.ADMIN) navigate(Routes.ADMIN_DASHBOARD);
        else if (user.data.role === Roles.AGENT)
          navigate(Routes.AGENT_DASHBOARD);
        else navigate(Routes.USER_DASHBOARD);
      }
      setSubmitting(false);
      getAllLookUpData();
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
