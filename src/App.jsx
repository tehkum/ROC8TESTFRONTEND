import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Layout from "./components/layout";
import Analysis from "./pages/Analysis";
import LineAnalysis from "./pages/LineAnalysis";
import RequrireAuth from "./components/requireAuth";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/*" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
        </Route>
        <Route
          path="/analysis"
          element={
            <RequrireAuth>
              <Analysis />
            </RequrireAuth>
          }
        />
        <Route
          path="/line/:type"
          element={
            <RequrireAuth>
              <LineAnalysis />
            </RequrireAuth>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
