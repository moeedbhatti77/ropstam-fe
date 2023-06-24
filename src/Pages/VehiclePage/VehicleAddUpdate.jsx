import React, { useState, useCallback, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { useHistory } from "react-router-dom";
import {
  CreateCategorySchema,
  CreateVehicleSchema,
} from "../../helpers/validators";
import "./VehicleAddUpdate.css";
import axiosInstance from "../../helpers/axios";
export default function () {
  const token = localStorage.getItem("token") || null;
  const [categories, setCategories] = useState([]);
  const [initialValues, setInitialValues] = useState({
    make: "",
    model: "",
    registeredYear: "",
    color: "",
  });
  useEffect(() => {
    categories.length > 0 &&
      setInitialValues((prev) => {
        return { ...prev, category: categories[0]._id };
      });
  }, [categories]);
  useEffect(() => {
    if (!token) {
      history.push("/login");
    }
  }, [token]);
  useEffect(() => {
    getCategories();
  }, []);
  const createVehicle = useCallback(async (values) => {
    try {
      await axiosInstance.post("/vehicles", values);
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  }, []);
  const getCategories = useCallback(async () => {
    const { data } = await axiosInstance.get("/categories");
    setCategories(data.data);
  }, []);
  const createCategory = useCallback(async (values) => {
    try {
      await axiosInstance.post("/categories", values);
      getCategories();
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <>
      <Formik
        initialValues={{
          name: "",
        }}
        validationSchema={CreateCategorySchema}
        onSubmit={async (values) => {
          await createCategory(values);
          values.name = "";
        }}
      >
        {(props) => (
          <div>
            <div className="row mb-5">
              <div className="col-lg-12 text-center">
                <h1 className="mt-5">{`${"Create"} Category`}</h1>
              </div>
            </div>
            <Form>
              <div>
                <label htmlFor="name">Name</label>
                <Field
                  type="text"
                  name="name"
                  placeholder="Name of Category"
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
      {initialValues.hasOwnProperty("category") && (
        <Formik
          initialValues={initialValues}
          validationSchema={CreateVehicleSchema}
          onSubmit={(values) => {
            createVehicle(values);
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
                  <label htmlFor="category">Category</label>
                  <Field as="select" name="category" className="form-control">
                    {categories.length > 0 &&
                      categories.map((item) => {
                        return (
                          <option key={item._id} value={item._id}>
                            {item.name}
                          </option>
                        );
                      })}
                  </Field>
                </div>
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
                <button
                  type="submit"
                  className="btn btn-primary btn-block mt-4"
                >
                  Submit
                </button>
              </Form>
            </div>
          )}
        </Formik>
      )}
    </>
  );
}
