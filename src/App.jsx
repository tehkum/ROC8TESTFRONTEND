import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Layout from "./components/layout";
import Analysis from "./pages/Analysis";
import LineAnalysis from "./pages/LineAnalysis";
import { useEffect, useState } from "react";
import { fetchUser } from "./context/features/AuthSlice";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        if (!user) {
          const res = await dispatch(fetchUser());
          setUser(res);
        }
      } catch (error) {
        console.log(error.response.data);
      }
    };
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <div>
      <Routes>
        <Route path="/*" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
        </Route>
        <Route path="/analysis/*" element={user && <Analysis />} />
        <Route path="/line/:type" element={user && <LineAnalysis />} />
      </Routes>
    </div>
  );
}

export default App;
