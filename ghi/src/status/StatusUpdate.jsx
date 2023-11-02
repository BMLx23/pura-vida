import React, { useEffect, useState } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const StatusUpdate = () => {
  let { status_post_id, status_id } = useParams();
  const [userId, setUserId] = useState("");
  const [postId, setPostId] = useState("");
  const [condition, setCondition] = useState("");
  const [footTraffic, setFootTraffic] = useState("");
  const [isOpen, setIsOpen] = useState("");
  // const [createdOn, setCreatedOn] = useState("")
  const { token } = useToken();
  const navigate = useNavigate();

  const getUserId = async (status_post_id) => {
    const userUrl = `${process.env.REACT_APP_API_HOST}/api/user`;
    const response = await fetch(userUrl, { credentials: "include" });
    if (response.ok) {
      const data = await response.json();
      setUserId(data["id"]);
      setPostId(parseInt(status_post_id));
    }
  };

  useEffect(() => {
    getUserId(status_post_id);
  }, [status_post_id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const _date = new Date();
    const month = _date.getMonth() + 1;
    const day = _date.getDate();
    const year = _date.getFullYear();

    const data = {
      user_id: userId,
      post_id: postId,
      condition: condition,
      foot_traffic: footTraffic,
      is_open: isOpen,
      created_on: `${year}-${month}-${day}`
    };

    const statusUrl = `${process.env.REACT_APP_API_HOST}/api/status/${status_id}`;
    const fetchOption = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(statusUrl, fetchOption);
    if (response.ok) {
      event.target.reset();
      navigate(`/profile`);
    }
  };
  if (token) {
    return (
      <div className="w-full max-w-xs">
        <h5 className="card-header">Update Status</h5>
        <div className="card-body">
          <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={(e) => handleSubmit(e)}
          >
            <div className="mb-3">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Condition
              </label>
              <input
                name="condition"
                type="number"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="1-5"
                onChange={(e) => {
                  setCondition(e.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Foot Traffic
              </label>
              <input
                name="foot_traffic"
                type="number"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="1-3"
                onChange={(e) => {
                  setFootTraffic(e.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Is Open
              </label>
              <input
                name="is_open"
                type="number"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="1-2"
                onChange={(e) => {
                  setIsOpen(e.target.value);
                }}
              />
            </div>
            <div>
              <input
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                value="Update Status"
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
    return <div>YOU MUST BE LOGGED IN TO UPDATE A STATUS!</div>;
  }
};
export default StatusUpdate;
