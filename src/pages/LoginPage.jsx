import { useState } from "react";
import "./style.css";
import { useDispatch } from "react-redux";
import { login } from "../context/features/AuthSlice";

export default function LoginPage() {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(loginData));
    if (data.payload.token) {
      localStorage.setItem("token", data.payload.token);
      window.location.href = "/analysis";
    }
    console.log(data);
  };

  return (
    <div className="auth-page">
      <section>
        <form onSubmit={handleSubmit}>
          <h2>Login Form</h2>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              required
              placeholder="Enter your password"
            />
          </div>
          <button className="button-primary" type="submit">
            Login
          </button>
        </form>
      </section>
    </div>
  );
}
