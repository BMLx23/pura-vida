import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const UserProfilePage = () => {
  const [user, setUser] = useState("");

  const [loggedPosts, setLoggedPosts] = useState([]);
  const [loggedReviews, setLoggedReviews] = useState([]);
  const [loggedStatus, setLoggedStatus] = useState([]);
  const [loggedFavorites, setLoggedFavorites] = useState([]);

  const [posts, setPosts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [status, setStatus] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const navigate = useNavigate();

  const fetchLoggedInUserData = async () => {
    const url = `${process.env.REACT_APP_API_HOST}/api/user`;
    const response = await fetch(url, {credentials: 'include'});
    if (response.ok) {
        const data = await response.json();
        setUser(data)
    }
  };

  const fetchPostsData = async () => {
      const url = `${process.env.REACT_APP_API_HOST}/api/posts`;
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      };
  };

  const fetchReviewsData = async () => {
      const url = `${process.env.REACT_APP_API_HOST}/api/review`;
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setReviews(data);
      };
  };

  const fetchStatusData = async () => {
      const url = `${process.env.REACT_APP_API_HOST}/api/status/`;
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setStatus(data);
      };
  };

  const fetchFavoriteTrails = async () => {
    const url = `${process.env.REACT_APP_API_HOST}/api/favorites`
    const response = await fetch(url, {credentials: 'include'});
      if (response.ok) {
        const data = await response.json();
        setFavorites(data);
      };
  };


  useEffect(() => {
    fetchLoggedInUserData();
    fetchPostsData();
    fetchReviewsData();
    fetchStatusData();
    fetchFavoriteTrails();
  }, []);

  const profileData = async (posts, reviews, status, favorites, user) => {
    const loggedPostList = posts.filter((post) => post.created_by === user.id);
    setLoggedPosts(loggedPostList);

    const loggedReviewsList = reviews.filter((review) => review.user_id === user.id);
    setLoggedReviews(loggedReviewsList);

    const loggedStatusList = status.filter((stat) => stat.user_id === user.id);
    setLoggedStatus(loggedStatusList);

    const loggedFavoritesList = favorites.filter(favorite => favorite.user_id === user.id);
    setLoggedFavorites(loggedFavoritesList);
  };

  useEffect(() => {
    profileData(posts, reviews, status, favorites, user);
  }, [posts, reviews, status, favorites, user]);

  const navigateToPost = (post_id) => {
    navigate(`/posts/${post_id}`)
  };

    return (
      <div>
        <h3 className="bg-white bg-opacity-50 text-lg font-bold px-8 pt-4 pb-2">User Info</h3>
        <div className="bg-white bg-opacity-50 shadow-md px-8 pt-6 pb-8 mb-4">
          <table className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <thead>
              <tr>
                <th className="p-4">ID</th>
                <th className="p-4">Username</th>
                <th className="p-4">Email</th>
                <th className="p-4">Role</th>
                <th className="p-4">Joined</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-4">{user.id}</td>
                <td className="p-4">{user.username}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">{user.role}</td>
                <td className="p-4">{user.joined}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="bg-white bg-opacity-50 shadow-md text-lg font-bold px-8 pt-4 pb-2">List of Status</h3>
        <div className="bg-white bg-opacity-50 shadow-md px-8 pt-6 pb-8 mb-4">
          <table className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <thead>
              <tr>
                <th className="p-4">Trail Name</th>
                <th className="p-4">Condition</th>
                <th className="p-4">Foot Traffic</th>
                <th className="p-4">Open?</th>
                <th className="p-4">Update</th>
                <th className="p-4">Delete</th>
              </tr>
            </thead>
            <tbody>
              {loggedStatus.map((stat) => {
                return (
                  <tr key={stat.id}>
                    <td className="p-4">
                      <button onClick={() => navigateToPost(stat.post_id)}>
                        {stat.title}
                      </button>
                    </td>
                    <td className="p-4">{stat.condition}</td>
                    <td className="p-4">{stat.foot_traffic}</td>
                    <td className="p-4">{stat.is_open}</td>
                    <td className="p-4">
                      <button className="m-4 bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-1 px-1 rounded focus:outline-none focus:shadow-outline" onClick={() => navigate(`/${stat.post_id}/${stat.user_id}/${stat.id}/update`)}>
                        Update
                      </button>
                    </td>
                    <td className="p-4">
                      <button className="m-4 bg-red-500 hover:bg-red-400 text-white font-bold py-1 px-1 rounded focus:outline-none focus:shadow-outline" onClick={() => navigate(`/${stat.title}/${stat.user_id}/${stat.id}/delete`)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <h3 className="bg-white bg-opacity-50 shadow-md text-lg font-bold px-8 pt-4 pb-2">List of Favorites</h3>
        <div className="bg-white bg-opacity-50 shadow-md px-8 pt-6 pb-8 mb-4">
          <table className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <thead>
              <tr>
                <th className="p-4">Trail Name</th>
                <th className="p-4">Saved On</th>
              </tr>
            </thead>
            <tbody>
              {loggedFavorites.map((favorite) => {
                return (
                  <tr key={favorite.id}>
                    <td className="p-4">
                      <button onClick={() => navigateToPost(favorite.post_id)}>
                        {favorite.title}
                      </button>
                    </td>
                    <td className="p-4">{favorite.created_at}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <h3 className="bg-white bg-opacity-50 shadow-md text-lg font-bold px-8 pt-4 pb-2">List of Posts</h3>
        <div className="bg-white bg-opacity-50 shadow-md px-8 pt-6 pb-8 mb-4">
          <table className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <thead>
              <tr>
                <th className="p-4">Trail Name</th>
                <th className="p-4">Created On</th>
                <th className="p-4">Author</th>
                <th className="p-4">Update</th>
                <th className="p-4">Delete</th>
              </tr>
            </thead>
            <tbody>
              {loggedPosts.map((post) => {
                return (
                  <tr key={post.id}>
                    <td className="p-4">
                      <button onClick={() => navigateToPost(post.id)}>
                        {post.title}
                      </button>
                    </td>
                    <td className="p-4">{post.created_at}</td>
                    <td className="p-4">{post.author}</td>
                    <td className="p-4">
                      <button className="m-4 bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-1 px-1 rounded focus:outline-none focus:shadow-outline" onClick={() => navigate(`/posts/${post.id}/update`)}>
                        Update
                      </button>
                    </td>
                    <td className="p-4">
                      <button className="m-4 bg-red-500 hover:bg-red-400 text-white font-bold py-1 px-1 rounded focus:outline-none focus:shadow-outline" onClick={() => navigate(`/posts/${post.id}/delete`)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <h3 className="bg-white bg-opacity-50 shadow-md text-lg font-bold px-8 pt-4 pb-2">List of Reviews</h3>
        <div className="bg-white bg-opacity-50 shadow-md px-8 pt-6 pb-8 mb-4">
          <table className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <thead>
              <tr>
                <th className="p-4">Trail Name</th>
                <th className="p-4">Rating</th>
                <th className="p-4">Review</th>
                <th className="p-4">Created On</th>
                <th className="p-4">Update</th>
                <th className="p-4">Delete</th>
              </tr>
            </thead>
            <tbody>
              {loggedReviews.map((review) => {
                return (
                  <tr key={review.id}>
                    <td className="p-4">
                      <button onClick={() => navigateToPost(review.post_id)}>
                        {review.title}
                      </button>
                    </td>
                    <td className="p-4">{review.rating}</td>
                    <td className="p-4">{review.body}</td>
                    <td className="p-4">{review.created_at}</td>
                    <td className="p-4">
                      <button className="m-4 bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-1 px-1 rounded focus:outline-none focus:shadow-outline" onClick={() => navigate(`/reviews/${review.id}/update`)}>
                        Update
                      </button>
                    </td>
                    <td className="p-4">
                      <button className="m-4 bg-red-500 hover:bg-red-400 text-white font-bold py-1 px-1 rounded focus:outline-none focus:shadow-outline" onClick={() => navigate(`/${review.post_id}/reviews/${review.id}`)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
}

export default UserProfilePage
