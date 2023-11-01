import { useState, useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();
  const { token } = useToken();
  let { post_id } = useParams();

  const getData = async (post_id) => {
    const url = `${process.env.REACT_APP_API_HOST}/api/${post_id}/review`;
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setReviews(data);
    }
  };

  useEffect(() => {
    getData(post_id);
  }, [post_id]);

  const navigateToCreateReview = async () => {
    navigate(`/posts/${post_id}/review`);
  };

  return (
    <div>
      {token ? (
        <button
          className="m-4 bg-blue-500 hover:bg-blue-100 text-white font-bold py-1 px-1 rounded focus:outline-none focus:shadow-outline"
          onClick={() => navigateToCreateReview()}
        >
          Create Review
        </button>
      ) : null}
      <table className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <thead>
          <tr>
            <th className="p-4">Trail Rating</th>
            <th className="p-4">Trail Name</th>
            <th className="p-4">Created By</th>
            <th className="p-4">Review Body</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review) => {
            return (
              <tr key={review.id}>
                <td className="p-4">{review.rating}</td>
                <td className="p-4">{review.title}</td>
                <td className="p-4">{review.username}</td>
                <td className="p-4">{review.body}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ReviewList;
