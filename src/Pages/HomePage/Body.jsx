import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import Card from "../../components/card/Card";
// import 'bootstrap/dist/css/bootstrap.css'
import axiosInstance from "../../helpers/axios";
import { useSelector } from "react-redux";
import Axios from "axios";

export default function () {
  const token = localStorage.getItem("token") || null;
  const history = useHistory();
  const [blogs, setBlogs] = useState([]);
  const [count, setCount] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      history.push("/login");
    }
  }, [token]);
  useEffect(() => {
    (async () => {
      try {
        const data = await axiosInstance.get("/vehicles/count");
        setCount(() => {
          return data?.data?.count;
        });
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div>
      <Container>
        {count !== null && count !== undefined && (
          <h1>Total Vehicles : {count} </h1>
        )}
        <Row>
          {loading ? (
            <h1>Loading....</h1>
          ) : blogs.length === 0 ? (
            <h1>No comment </h1>
          ) : (
            blogs.map((blog) => {
              return (
                <Col key={blog._id} md={4} sm={6} xs={12}>
                  <Card name={`${blog.title}`} id={blog._id} cb={fetchPosts} />
                </Col>
              );
            })
          )}
        </Row>
      </Container>
    </div>
  );
}
