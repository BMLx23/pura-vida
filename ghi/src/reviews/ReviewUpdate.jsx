import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ReviewUpdate = () => {
  const [logger, setLogger] = useState('')
  const [reviewInfo, setReviewInfo] = useState('')
  const [body, setBody] = useState("");
  const [rating, setRating] = useState(0);
  const [userId, setUserId] = useState(0);
  const [postId, setPostId] = useState(0);
  const [date, setDate] = useState("");
  const navigate = useNavigate();
  let { review_id } = useParams();


    const fetchData = async () => {
        const url = `${process.env.REACT_APP_API_HOST}/api/user`;
        const response = await fetch(url, {credentials: 'include'});
        if (response.ok) {
        const data = await response.json();
        setLogger(data);
        }
    };

    const fetchReviewData = async (review_id) => {
        const url = `${process.env.REACT_APP_API_HOST}/api/review/${review_id}`;
            const response = await fetch(url, {credentials: 'include'});
            if (response.ok) {
            const reviewData = await response.json();
            setReviewInfo(reviewData);
        }
    };

    useEffect(() => {
        fetchData();
        fetchReviewData(review_id);
    }, [review_id]);

    useEffect(() => {
        if (reviewInfo !== '') {
            setBody(reviewInfo.body);
            setRating(reviewInfo.rating);
            setUserId(reviewInfo.user_id);
            setPostId(reviewInfo.post_id);
            setDate(reviewInfo.created_at);
        }
    }, [reviewInfo]);

  const handleSubmit = async (e, review_id) => {
    e.preventDefault();
    const reviewData = {
      rating: rating,
      user_id: userId,
      post_id: postId,
      created_at: date,
      body: body,
    };

    const updateReviewUrl = `${process.env.REACT_APP_API_HOST}/api/review/${review_id}`;
    const fetchOption = {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
            },
        body: JSON.stringify(reviewData)
    }
    const response = await fetch(updateReviewUrl, fetchOption);
    if (response.ok) {
        e.target.reset();
        navigate("/profile");
    }
  };


  if (reviewInfo.user_id === logger.id) {
      return (
        <div className="w-full max-w-xs">
          <h5 className="card-header">Update Review</h5>
          <div className="card-body">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={(e) => handleSubmit(e, review_id)}>
              <div className="mb-3">
                <label className="block text-gray-700 text-sm font-bold mb-2">body</label>
                <input
                  value={body}
                  name="body"
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  onChange={(e) => {
                    setBody(e.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor= "rating" className="block text-gray-700 text-sm font-bold mb-2">rating</label>
                <input
                  value={rating}
                  id="rating"
                  name="rating"
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  onChange={(e) => {
                    setRating(e.target.value);
                  }}
                />
              </div>
              <div>
                <input
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                value="Update Review"
              />
              <button
                className="m-4 bg-gray-300 hover:bg-blue-300 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => navigate(`/profile`)}
              >
                Cancel
              </button>
              </div>
            </form>
          </div>
        </div>
      );
  } else {
    return (
        <div>
            THIS IS NOT YOUR POST!
        </div>
    )
  }
};

export default ReviewUpdate;
