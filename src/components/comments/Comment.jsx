import React, { memo, useCallback } from "react";
import axiosInstance from "../../helpers/axios";

function Comment(props) {
  const deleteComment = useCallback(
    (id) => {
      axiosInstance
        .delete(`comment/${id}`)
        .then(() => {
          props.cb(props.postId);
        })
        .catch((err) => alert(err.response.data));
    },
    [props]
  );

  return (
    <li className="media p-4 mw-100">
      <div>
        <div className="float-left">
          <img
            src={`https://picsum.photos/200`}
            className="mr-3 text-center"
            alt="..."
            height="50px"
            width="50px"
            style={{ borderRadius: "50px" }}
          />
        </div>
        <div className="media-body">
          <label className="font-italic font-weight-bold text-center">
            {props.data.user.name}:
          </label>
          <span className="ml-3">{props.data.comment}</span>
          <div
            className="btn btn-danger text-white font-weight-bold mt-2"
            onClick={() => deleteComment(props.data._id)}
          >
            Delete Comment
          </div>
        </div>
      </div>
    </li>
  );
}

export default memo(Comment);
