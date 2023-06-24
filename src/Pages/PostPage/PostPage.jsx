import React, { useState, useEffect, useCallback } from "react";
import PostCard from "../../components/postCard/PostCard";
import "./PostPage.css";
import Comment from "../../components/comments/Comment";
import axiosInstance from "../../helpers/axios";

function PostPage({ match }) {
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const postId = match.url.split("/")[match.url.split("/").length - 1];
  const fetchPost = useCallback(
    (id) => {
      if (id)
        axiosInstance
          .get(`blog/${id}`)
          .then((res) => {
            setPost({ ...res.data });
            setComments([...res.data.comments]);
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
          });
    },
    [postId]
  );

  // useEffect(() => {
  //   fetchPost(postId);
  // }, [postId]);

  return (
    <div>
      {post.title === undefined ? (
        <h1>Loading....</h1>
      ) : (
        <PostCard
          title={post.title}
          author={post.user}
          date={post.createdAt}
          description={post.description}
        />
      )}

      <h4 className="mt-4 text-center">Comments</h4>
      <div className="comment-box d-flex justify-content-center">
        <ul className=" m-4 mw-100">
          {loading ? (
            <h1>Loading....</h1>
          ) : comments.length === 0 ? (
            <h1>No comment </h1>
          ) : (
            comments.map((comment) => (
              <Comment
                key={comment._id}
                data={comment}
                cb={fetchPost}
                postId={postId}
              />
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default PostPage;
