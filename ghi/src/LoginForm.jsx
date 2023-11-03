import { useState, useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [count, setCount] = useState(0);
  const { token, login } = useToken();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password);
    const attempts = count + 1
    setTimeout(() => {
      setCount(attempts);
    }, 0.5*1000)
  };

  const playerLogin = () => {
    console.log("successful login"); // add a toastify notification of successful login
  };

  useEffect(()=>{
    if (token) {
      playerLogin();
      navigate(`/`);
      }
  }, [token, navigate]);

  return (
    <div className="w-full max-w-xs">
      <form className="bg-white bg-opacity-40 shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" onChange={(e) => setPassword(e.target.value)}/>
          { count > 0 ? <p className="text-red-500 text-xs italic">Please choose a valid password.</p> : null }
        </div>
        <div className="flex items-center justify-between">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={(e) => handleSubmit(e)}>
            Login
          </button>
          <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="/">
            Forgot Password?
          </a>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
