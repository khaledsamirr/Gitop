import { useState } from "react";
import "./Register.scss";
import newRequest from "../../utils/newRequest";
import { Link, useNavigate } from "react-router-dom";
import upload from "../../utils/upload.js"


export default function Register() {

  const[open,setOpen]=useState(false);
  const [error, setError] = useState(null);

  const [file, setFile] = useState(null);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    img: "",
    country: "",
    isSeller: false,
    desc: "",
  });

  const navigate = useNavigate();

  const handleChange=(e)=>{
    setUser((prev)=>{
      return {...prev,[e.target.name]:e.target.value}
    })
  }
  

  const handleSeller = (e) => {
    setOpen(!open)
    setUser((prev) => {
      return { ...prev, isSeller: e.target.checked };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = file? await upload(file):"";

    try {
     const res= await newRequest.post("/auth/register", {
        ...user,
        img: url,
      });
      navigate("/login")
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="register">
      <div className="top">
        <div className="wrapper">
          <Link to="/"><h1 className="logo">Gitop</h1></Link>
        </div>
      </div>
      <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="left">
          <h1>Create a new account</h1>
          <label htmlFor="">Username</label>
          <input
            name="username"
            type="text"
            placeholder="Enter your username"
            onChange={handleChange}
          />
          <label htmlFor="">Email</label>
          <input
            name="email"
            type="email"
            placeholder="ex: example@company.com"
            onChange={handleChange}
          />
          <label htmlFor="">Password</label>
          <input name="password" type="password" onChange={handleChange} placeholder="Enter your password" />
          <label htmlFor="">Profile Picture</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          <label htmlFor="">Country</label>
          <input
            name="country"
            type="text"
            placeholder="ex: Egypt"
            onChange={handleChange}
          />
         
        </div>
        <div className="right">
          <h1>I want to become a seller</h1>
          <div className="toggle">
            <label htmlFor="">Activate the seller account</label>
            <label className="switch">
              <input type="checkbox" onChange={handleSeller}  />
              <span className="slider round"></span>
            </label>
          </div>
          {
            open&&
           <> 
           <h4>
            Please Enter these two additional fields 
           </h4>
          <label htmlFor="">Phone Number</label>
          <input
            name="phone"
            type="text"
            placeholder="+1 234 567 89"
            onChange={handleChange}
            />
          <label htmlFor="">Description</label>
          <textarea
            placeholder="A short description about yourself"
            name="desc"
            id=""
            cols="30"
            rows="10"
            onChange={handleChange}
            ></textarea>
            </>
          }
           <button type="submit">Register</button>
           {error && <span className="error">{error}</span>}
           <span>
            Already have an account? <Link to="/login"> <b>Sign in.</b> </Link>
          </span>
        </div>
      </form>
      </div>
    </div>
  );
}
