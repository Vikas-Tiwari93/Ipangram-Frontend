import { Outlet, useNavigate } from "react-router-dom";
import "./signin.css";

export default function Signin() {
  const navigate = useNavigate();
  const signUphandleClick = () => {
    navigate("/auth/signup/select");
  };
  const signInhandleClick = () => {
    navigate("/auth/signin/loginform");
  };
  return (
    <>
      <div className="AuthHead">
        <h2>Ipangram logo</h2>
        <div className="headleft">
          <button onClick={() => signInhandleClick()}>Signin</button>
          <button onClick={() => signUphandleClick()}>Signup</button>
        </div>
      </div>
      <div className="AuthBody">
        <div>
          <Outlet />
        </div>
      </div>
    </>
  );
}
