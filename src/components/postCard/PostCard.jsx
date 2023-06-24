import React from "react";
import "./PostPage.css";

function PostCard(props) {
  return (
    <div className="card w-100">
      <h1>{props.title}</h1>
      <div className=" p-5 ">
        <div className="mainContent mx-auto">{props.description}</div>
      </div>
      <p className="title text-secondary">
        Date :{" "}
        {new Date(props.date).toLocaleDateString() ||
          new Date().toLocaleDateString()}
      </p>
      <p>Author : {props.author.name}</p>
    </div>
  );
}
export default PostCard;
