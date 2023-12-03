import { useState } from "react";
import "./style.css";
import { useDispatch } from "react-redux";
import { register } from "../context/features/AuthSlice";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (signupData.password === signupData.confirmPassword) {
      const data = await dispatch(
        register({ email: signupData.email, password: signupData.password })
      );
      if (data.payload.token) {
        navigate("/login");
      }
      console.log(data);
    }
  };

  return (
    <div className="auth-page">
      <section>
        <form onSubmit={handleSubmit}>
          <h2>Signup Form</h2>
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
          <div>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              onChange={handleChange}
              required
              placeholder="Confirm your password"
            />
          </div>
          <button className="button-primary" type="submit">
            Signup
          </button>
        </form>
      </section>
    </div>
  );
}
