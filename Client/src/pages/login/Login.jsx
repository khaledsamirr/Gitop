import { useState } from "react";
import "./Login.scss";
import newRequest from "../../utils/newRequest";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await newRequest.post("/auth/login", { username, password });
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      navigate("/")
    } catch (err) {
      if(err.response.status===404){
        setError("User not found!")
      }
      if(err.response.status===400){
        setError("Username or password is wrong!");
      }
      if(err.response.status===500){
        setError("Something went wrong, Please try again later!");
      }
      
    }
  };

  return (
    <div className="login">
      <div className="top">
        <div className="wrapper">
          <Link to="/"><h1 className="logo">Gitop</h1></Link>
        </div>
      </div>
      <div className="container">
      
        <form onSubmit={handleSubmit}>
          <h1>Sign In</h1>
          <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
          <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          <button className="loginButton">Sign In</button>
          {error && <span className="error">{error}</span>}
          <span>
            New to Gitop? <Link to="/register"> <b>Sign up now.</b> </Link>
          </span>
          <small>
            Explore the most flexible freelancing platform recently.
          </small>
        </form>
      </div>
    </div>
  );
}
