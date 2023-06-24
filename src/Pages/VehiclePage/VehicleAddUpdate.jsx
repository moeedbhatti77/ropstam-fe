import React, { useState, useCallback, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { Link, useHistory } from "react-router-dom";
import { CreateVehicleSchema } from "../../helpers/validators";
import "./VehicleAddUpdate.css";
import axiosInstance from "../../helpers/axios";
export default function () {
  const token = localStorage.getItem("token") || null;
  useEffect(() => {
    if (!token) {
      history.push("/login");
    }
  }, [token]);
  useEffect(() => {
    (async () => {
      const { data } = await axiosInstance.get("vehicles/types");
      console.log(data.vehicleTypes);
    })();
  }, []);
  return (
    <>
      <h3>{"Create Post"}</h3>
      <Formik
        initialValues={{
          make: "",
          model: "",
          registeredYear: "",
          color: "",
        }}
        validationSchema={CreateVehicleSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {(props) => (
          <div>
            <div className="row mb-5">
              <div className="col-lg-12 text-center">
                <h1 className="mt-5">{`${"Create"} Vehicle`}</h1>
              </div>
            </div>
            <Form>
              <div>
                <label htmlFor="make">Manufacturer</label>
                <Field
                  type="text"
                  name="make"
                  placeholder="Manufacturer of Vehicle"
                  autoComplete="off"
                  className="form-control"
                />
              </div>
              <div>
                <label htmlFor="model">Model</label>
                <Field
                  type="text"
                  name="model"
                  placeholder="Model of Vehicle"
                  autoComplete="off"
                  className="form-control"
                />
              </div>
              <div>
                <label htmlFor="color">Color</label>
                <Field
                  type="text"
                  name="color"
                  placeholder="Color of Vehicle"
                  autoComplete="off"
                  className="form-control"
                />
              </div>
              <div>
                <label htmlFor="registeredYear">Registration Year</label>
                <Field
                  type="number"
                  name="registeredYear"
                  placeholder="Registration Year of Vehicle"
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
      <Link to="/signUp">Don't Have Account ? Register Here</Link>
    </>
  );
}
