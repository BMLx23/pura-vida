import { useState, useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const fetchData = async (setPost, post_id) => {
  const url = `${process.env.REACT_APP_API_HOST}/api/posts/${post_id}`;
  const response = await fetch(url, { credentials: "include" });
  if (response.ok) {
    const data = await response.json();
    setPost(data);
  }
};

const PostDetail = () => {
  let { post_id } = useParams();
  const [post, setPost] = useState("");
  const token = useToken();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData(setPost, post_id);
  }, [setPost, post_id]);

  console.log(post_id);
  const navigateToCreateReview = async (post_id) => {
    navigate(`/posts/${post_id}/review`);
  };
  const navigateToReviewList = async (post_id) => {
    navigate(`/posts/${post_id}/reviews`);
  };

  const navigateToStatusList = async (post_id) => {
    navigate(`/posts/${post_id}/statuses`);
  };

  const navigateToCreateStatus = async (post_id) => {
    navigate(`/posts/${post_id}/status`);
  };
  return (
    <div>
      {token ? (
        <button
          className="m-4 bg-blue-500 hover:bg-blue-100 text-white font-bold py-1 px-1 rounded focus:outline-none focus:shadow-outline"
          onClick={() => navigateToCreateReview(post_id)}
        >
          Create Review
        </button>
      ) : null}
      {token ? (
        <button
          className="m-4 bg-blue-500 hover:bg-blue-100 text-white font-bold py-1 px-1 rounded focus:outline-none focus:shadow-outline"
          onClick={() => navigateToReviewList(post_id)}
        >
          Review List
        </button>
      ) : null}
      <button
        className="m-4 bg-blue-500 hover:bg-blue-100 text-white font-bold py-1 px-1 rounded focus:outline-none focus:shadow-outline"
        onClick={() => navigateToStatusList(post_id)}
      >
        Trail Status
      </button>
      {token ? (
        <button
          className="m-4 bg-blue-500 hover:bg-blue-100 text-white font-bold py-1 px-1 rounded focus:outline-none focus:shadow-outline"
          onClick={() => navigateToCreateStatus(post_id)}
        >
          Create Status
        </button>
      ) : null}
      <table className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <thead>
          <tr>
            <th className="p-4">Title</th>
            <th className="p-4">Latitude</th>
            <th className="p-4">Longitude</th>
            <th className="p-4">Zipcode</th>
            <th className="p-4">Description</th>
            <th className="p-4">Created By</th>
            <th className="p-4">Created At</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-4">{post.title}</td>
            <td className="p-4">{post.latitude}</td>
            <td className="p-4">{post.longitude}</td>
            <td className="p-4">{post.zipcode}</td>
            <td className="p-4">{post.body}</td>
            <td className="p-4">{post.created_by}</td>
            <td className="p-4">{post.created_at}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PostDetail;
