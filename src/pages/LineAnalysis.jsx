import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../context/features/DataSlice";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/SideBar/Sidebar";
import LineData from "../components/LineGraph/Line";
import MenuIcon from "@mui/icons-material/Menu";
import { navToggle } from "../context/features/filterSlice";

export default function LineAnalysis() {
  const { data, status } = useSelector((state) => state.data);
  const dispatch = useDispatch();
  const { type } = useParams();
  const navigate = useNavigate();
  const [isNavVisible, setIsNavVisible] = useState(window.innerWidth > 768);
  const { nav } = useSelector((state) => state.filter);

  useEffect(() => {
    if (status !== "succeeded") {
      dispatch(fetchData());
    }

    const handleResize = () => {
      setIsNavVisible(window.innerWidth > 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch, status]);

  useEffect(() => {
    localStorage.setItem("type", type);
  }, [type]);

  useEffect(() => {
    if (status !== "succeeded") {
      dispatch(fetchData());
    }
  }, [dispatch, status]);

  console.log(data);

  return (
    <div className="page-container">
      {isNavVisible && <Sidebar />}
      {!isNavVisible && nav && (
        <div className="phone-nav">
          {" "}
          <Sidebar />
        </div>
      )}

      <div>
        {!isNavVisible && (
          <div className="main-bar">
            <MenuIcon
              className="menu-icon"
              sx={{ margin: 5 }}
              onClick={() => dispatch(navToggle())}
            />
            <h3>Line Analysis Of {type}</h3>
          </div>
        )}
        {isNavVisible && <h3>Line Analysis Of {type}</h3>}
        <button
          className="button-secondary"
          style={{ marginTop: 20 }}
          onClick={() => navigate("/analysis")}
        >
          Home
        </button>

        <LineData type={type} data={data} />
      </div>
    </div>
  );
}
