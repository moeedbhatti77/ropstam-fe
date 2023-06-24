import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import axios from "../../helpers/axios";
import { login as loginAction } from "../../redux/reducers/authReducer";
import { Formik, Form, Field } from "formik";
import { Link, useHistory } from "react-router-dom";
import { LoginSchema } from "../../helpers/validators";
export default function () {
  const history = useHistory();
  const dispatch = useDispatch();
  const [login, setLogin] = useState({});
  const token = localStorage.getItem("token");
  if (token) {
    history.push("/");
  }

  const submitHandler = useCallback(
    async (event) => {
      try {
        const response = await axios.post("/auth/signIn", { ...event });
        const { data } = response;
        (async () => {
          await new Promise((resolve, reject) => {
            dispatch(loginAction(data));
            localStorage.setItem("token", data.token);
            setTimeout(() => {
              history.push("/");
            }, 100);
            resolve();
          });
        })();
      } catch (error) {
        setLogin({});
        alert(error.response.data.message);
      }
    },
    [login]
  );

  return (
    <>
      <h3>Sign In</h3>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={(values, actions) => submitHandler(values)}
      >
        {(props) => (
          <div>
            <div className="row mb-5">
              <div className="col-lg-12 text-center">
                <h1 className="mt-5">Login Form</h1>
              </div>
            </div>
            <Form>
              <div>
                <label htmlFor="email">Email</label>
                <Field
                  type="  "
                  name="email"
                  placeholder="Enter Email or User Name"
                  autoComplete="off"
                  className="form-control"
                />
              </div>
              <div>
                <label htmlFor="password" className="mt-3">
                  Password
                </label>
                <Field
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  className="form-control"
                />
              </div>
              <button type="submit" className="btn btn-primary btn-block mt-4">
                Submit
              </button>
            </Form>
          </div>
        )}
      </Formik>
      <Link to="/signUp">Don't Have Account ? Register Here</Link>
    </>
  );
}
