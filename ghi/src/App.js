import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import { Main } from "./Main";
import LoginForm from "./LoginForm.jsx";
import SignupForm from "./SignUpForm.jsx";
import PostsForm from "./posts/PostsForm";
import PostList from "./posts/PostsList";
import PostDetail from "./posts/PostDetail";
import ReviewForm from "./reviews/ReviewForm";
import ReviewList from "./reviews/ReviewList";
import ReviewDelete from "./reviews/ReviewDelete";
import StatusForm from "./status/StatusForm";
import StatusList from "./status/StatusList";
import StatusDelete from "./status/StatusDelete";
import StatusUpdate from "./status/StatusUpdate";
import Favorites from "./favorites/Favorites";
import AddFavorite from "./favorites/AddFavorite";
import Navbar from "./components/Navbar/Navbar";
import UsersList from "./users/UsersList";
import UserDetail from "./users/UserDetail";
import UserDelete from "./users/UserDelete";
import UserProfilePage from "./users/UserProfilePage";
import PostUpdate from "./posts/PostUpdate";
import LogoutForm from "./LogoutForm";
import PostDelete from "./posts/PostDelete";
import ReviewUpdate from "./reviews/ReviewUpdate";


function App() {
  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, "");

  return (
    <div>
      <BrowserRouter basename={basename}>
        <div className="bg-mountain bg-no-repeat bg-cover h-screen overflow-visible">
          <div className="h-screen overflow-scroll">
          <AuthProvider baseUrl={process.env.REACT_APP_API_HOST}>
            <Navbar />
            <div className="w-[80vw]">
            <Routes>
              <Route exact path="/" element={<Main />} />
              <Route exact path="/profile" element={<UserProfilePage />} />
              <Route exact path="/users" element={<UsersList />} />
              <Route exact path="/users/:username" element={<UserDetail />} />
              <Route
                exact
                path="/users/:username/delete"
                element={<UserDelete />}
              />
              <Route exact path="/signup" element={<SignupForm />} />
              <Route exact path="/login" element={<LoginForm />} />
              <Route exact path="/logout" element={<LogoutForm />} />
              <Route exact path="/post" element={<PostsForm />} />
              <Route exact path="/posts/" element={<PostList />} />
              <Route exact path="/posts/:post_id" element={<PostDetail />} />
              <Route exact path="/posts/:post_id/delete" element={<PostDelete />} />
              <Route
                exact
                path="/posts/:post_id/update"
                element={<PostUpdate />}
              />
              <Route exact path="/favorites" element={<Favorites />} />
              <Route exact path="/:post_id/favorites/add" element={<AddFavorite />} />
              <Route
                exact
                path="/posts/:post_id/review"
                element={<ReviewForm />}
              />
              <Route
                exact
                path="/posts/:post_id/reviews"
                element={<ReviewList />}
              />
              <Route
                exact
                path="/:post_id/reviews/:review_id"
                element={<ReviewDelete />}
              />
              <Route
                exact
                path="/reviews/:review_id/update"
                element={<ReviewUpdate />}
              />
              <Route
                exact
                path="/posts/:post_id/status"
                element={<StatusForm />}
              />
              <Route
                exact
                path="/posts/:post_id/statuses"
                element={<StatusList />}
              />
              <Route
                exact
                path="/:status_title/:status_user_id/:status_id/delete"
                element={<StatusDelete />}
              />
              <Route
                exact
                path="/:status_post_id/:status_user_id/:status_id/update"
                element={<StatusUpdate />}
              />
            </Routes>
            </div>
          </AuthProvider>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
