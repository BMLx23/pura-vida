import { useState, useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate, useParams } from "react-router-dom";

const StatusList = () => {
  const [status, setStatus] = useState([]);
  const [todaysDate, setTodaysDate] = useState('');
  const [todaysStatus, setTodaysStatus] = useState([]);
  const navigate = useNavigate();
  const { token } = useToken();
  let { post_id } = useParams();

  const fetchData = async (post_id) => {
    const url = `${process.env.REACT_APP_API_HOST}/api/status/${post_id}`;
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setStatus(data);
    }
    const _date = new Date();
    const month = _date.getMonth() + 1;
    const day = _date.getDate();
    const year = _date.getFullYear();
    const today = day < 10 ? `${year}-${month}-0${day}` : `${year}-${month}-${day}`;
    setTodaysDate(today);
  };

  useEffect(() => {
    fetchData(post_id);
    const interval = setInterval(() => {
      fetchData(post_id);
    }, 15000);
    return () => clearInterval(interval);
  }, [post_id]);

  const filteredStatus = async (status, todaysDate) => {
    const listOfTodaysStatuses = status.filter((stat) => stat.created_on === todaysDate)
    setTodaysStatus(listOfTodaysStatuses)
  };

  useEffect(() => {
    filteredStatus(status, todaysDate);
  }, [status, todaysDate]);

  const navigateToCreateStatus = async (post_id) => {
    navigate(`/posts/${post_id}/status`);
  };

  return (
    <div>
    {/* <div  className="grid grid-cols-8 gap-0"> */}
      <div>
      {/* <div className="col-start-6 col-span-3 row-start-3"> */}
      {token ? (
        <button
          className="m-4 bg-blue-500 hover:bg-blue-100 text-white font-bold py-1 px-1 rounded focus:outline-none focus:shadow-outline"
          onClick={() => navigateToCreateStatus(post_id)}
        >
          Create Status
        </button>
      ) : null}
      </div>
      <div>
      {/* <div className="col-start-6 col-span-8"> */}
        <table className="bg-white bg-opacity-40 shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <thead>
            <tr>
              <th className="p-4">Trail</th>
              <th className="p-4">Trail Condition</th>
              <th className="p-4">Foot Traffic</th>
              <th className="p-4">Is it open?</th>
              <th className="p-4">Status by</th>
              {/* <th className="p-4">Created On</th> */}
            </tr>
          </thead>
          <tbody>
            {todaysStatus.map((stat) => {
              return (
                <tr key={stat.id}>
                  <td className="p-4">{stat.title}</td>
                  <td className="p-4">{stat.condition}</td>
                  <td className="p-4">{stat.foot_traffic}</td>
                  <td className="p-4">{stat.is_open}</td>
                  <td className="p-4">{stat.username}</td>
                  {/* <td className="p-4">{status.created_on}</td> */}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default StatusList;
