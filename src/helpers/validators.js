import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(5, "Password must be 5 characters at minimum")
    .required("Password is required"),
});
export const SignUpSchema = Yup.object().shape({
  email: Yup.string().email().required("Email is required"),
  name: Yup.string().required("Name of User is required"),
  userName: Yup.string().required("A Unique userName is required"),
});
export const CreateVehicleSchema = Yup.object().shape({
  make: Yup.string().required("Make of Vehicle is required"),
  model: Yup.string().required("Mode of Vehicle is required"),
  color: Yup.string().required("Color of Vehicle is required"),
  registeredYear: Yup.number()
    .max(new Date().getFullYear())
    .min(1900)
    .required("Vehicle Registration year is required"),
});
