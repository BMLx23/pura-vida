import { useState, useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const { token } = useToken();

  const fetchData = async () => {
    const url = `${process.env.REACT_APP_API_HOST}/api/posts`;
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setPosts(data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const navigateToPost = async (post_id) => {
    navigate(`/posts/${post_id}`);
  };

  const navigateToCreatePost = async () => {
    navigate(`/post`);
  };

  return (
    <div>
      {token ? (
        <button
          className="m-4 bg-blue-500 hover:bg-blue-100 text-white font-bold py-1 px-1 rounded focus:outline-none focus:shadow-outline"
          onClick={() => navigateToCreatePost()}
        >
          Create Trail
        </button>
      ) : null}
      {/* <table className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <thead>
          <tr>
            <th className="p-4">Trail Name</th>
            <th className="p-4">View Trail</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => {
            return (
              <tr key={post.id}>
                <td className="p-4">{post.title}</td>
                <td className="p-4">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => navigateToPost(post.id)}
                  >
                    View
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table> */}
      <div className="grid grid-cols-3 col-span-5 gap-4">
        {posts.map((post) => {
          return (
            <div key={post.id} className="bg-white bg-opacity-40 max-w-sm rounded overflow-hidden shadow-xl">
              <img
                className="w-full"
                src="https://images.unsplash.com/photo-1543039625-14cbd3802e7d?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8b3V0ZG9vcnxlbnwwfHwwfHx8MA%3D%3D"
                alt="Sunset in the mountains"
              />
              <div className="px-6 py-4">
                <div className="font-bold text-2xl mb-2">
                  <button
                    className="hover:bg-blue-50 text-black font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => navigateToPost(post.id)}
                  >
                    {post.title}
                  </button>
                </div>
                <p className="text-grey-800 font-bold text-lg italic">{post.body}</p>
              </div>
              <div className="px-6 pt-4 pb-2">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  #photography
                </span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  #travel
                </span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  #winter
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PostList;
