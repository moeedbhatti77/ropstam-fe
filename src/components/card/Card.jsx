import React, { memo, useCallback } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../helpers/axios";
function Card({ name, id, cb }) {
  const deletePost = useCallback((id) => {
    axiosInstance
      .delete(`blog/${id}`)
      .then(() => {
        cb();
      })
      .catch((err) => alert(err.response.data));
  }, []);
  return (
    <div
      className="card specialCard mx-auto"
      style={{
        width: "18rem",
        padding: "20px",
        backgroundColor: "rgb(246,246,246)",
        border: "none",
        margin: "15px",
      }}
    >
      <div className="card-body text-center">
        <h5 className="card-title text-black-50">{name}</h5>

        <Link
          className="btn btn-primary text-white font-weight-bold"
          to={`/Post/${id}`}
          id={id}
        >
          View Blog
        </Link>
        <div
          className="btn btn-danger text-white font-weight-bold mt-2"
          onClick={() => deletePost(id)}
        >
          Delete Blog
        </div>
      </div>
    </div>
  );
}
export default memo(Card);
