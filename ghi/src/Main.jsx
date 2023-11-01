import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Main = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

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

  return (
      <div className="grid grid-cols-3 col-span-5 gap-4">
        {posts.map((post) => {
          return (
            <div className="bg-white bg-opacity-30 max-w-sm rounded overflow-hidden shadow-xl">
              <img
                className="w-full"
                src="https://images.unsplash.com/photo-1543039625-14cbd3802e7d?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8b3V0ZG9vcnxlbnwwfHwwfHx8MA%3D%3D"
                alt="Sunset in the mountains"
              />
              <div className="px-6 py-4">
                <div className="font-bold text-2xl mb-2">
                  <button
                    className="hover:bg-blue-50 text-black font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => navigate(`/posts/${post.id}`)}
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
  );
};
