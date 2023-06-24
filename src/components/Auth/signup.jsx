import React from "react";
import { useState, useCallback } from "react";
import axios from "../../helpers/axios";
import { useHistory } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { SignUpSchema } from "../../helpers/validators";
export default function () {
  const history = useHistory();

  const [signUpForm, setSignUpForm] = useState({});
  const handleChange = useCallback((event) => {
    event.preventDefault();
    setSignUpForm((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  }, []);
  const submitHandler = useCallback(
    async (data) => {
      try {
        await axios.post("/auth/signUp", data);
        history.push("/login");
      } catch (error) {
        setLogin({});
        alert(error.response.data.message);
      }
    },
    [signUpForm]
  );
  return (
    <>
      <h3>Sign Up</h3>
      <Formik
        initialValues={{ email: "", name: "", userName: "" }}
        validationSchema={SignUpSchema}
        onSubmit={(values, actions) => submitHandler(values)}
      >
        {(props) => (
          <div>
            <div className="row mb-5">
              <div className="col-lg-12 text-center">
                <h1 className="mt-5">SignUp Form</h1>
              </div>
            </div>
            <Form>
              <div>
                <label htmlFor="email">Name</label>
                <Field
                  type="email"
                  name="name"
                  placeholder="Enter Name"
                  autoComplete="off"
                  className="form-control"
                />
              </div>
              <div>
                <label htmlFor="userName">User Name</label>
                <Field
                  type="  "
                  name="userName"
                  placeholder="Enter User Name"
                  autoComplete="off"
                  className="form-control"
                />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <Field
                  type="email"
                  name="email"
                  placeholder="Enter Email "
                  autoComplete="off"
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
      <p className="forgot-password text-right">
        Already registered <a href="/login">sign in?</a>
      </p>
    </>
  );
}
