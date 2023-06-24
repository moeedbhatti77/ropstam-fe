import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
  email: Yup.string().required("Email is required"),
  password: Yup.string()
    .min(5, "Password must be 5 characters at minimum")
    .required("Password is required"),
});
export const SignUpSchema = Yup.object().shape({
  email: Yup.string().email().required("Email is required"),
  name: Yup.string().required("Name of User is required"),
  userName: Yup.string().required("A Unique userName is required"),
});
