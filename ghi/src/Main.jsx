import useToken from "@galvanize-inc/jwtdown-for-react";
import LoginForm from "./LoginForm";
import TokenCard from "./TokenCard";
import LogoutForm from "./LogoutForm";

const ConsoleBanner = () => {
  return (
    <div className="alert alert-info mt-3 mb-3" role="alert">
      <i className="bi bi-info-circle-fill"></i> Open your browser's console to
      see more information.
    </div>
  );
};

export const Main = () => {
    const { token } = useToken();
  return (
    <div>
      <ConsoleBanner />
      {!token && <LoginForm />}
      {token && <TokenCard />}
      {token && <LogoutForm />}

      {/* <UserDataCard /> */}
    </div>
  );
};