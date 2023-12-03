import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../context/features/DataSlice";
import Bar from "../components/BarGraph/Bar";
import { useNavigate } from "react-router-dom";
import "./style.css";
import MenuIcon from "@mui/icons-material/Menu";
import { navToggle } from "../context/features/filterSlice";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import copy from "copy-to-clipboard";

export default function BarAnalysis() {
  const dispatch = useDispatch();
  const { data, status } = useSelector((state) => state.data);
  const navigate = useNavigate();
  const [isNavVisible, setIsNavVisible] = useState(window.innerWidth > 768);

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

  return (
    <div>
      {!isNavVisible && (
        <div className="main-bar">
          <MenuIcon
            className="menu-icon"
            sx={{ margin: 5 }}
            onClick={() => dispatch(navToggle())}
          />
          <h3>Bar Analysis</h3>
        </div>
      )}
      {isNavVisible && <h3>Bar Analysis</h3>}
      <Bar data={data} />
      <div className="chips">
        <p onClick={() => navigate("/line/A")}>A</p>
        <p onClick={() => navigate("/line/B")}>B</p>
        <p onClick={() => navigate("/line/C")}>C</p>
        <p onClick={() => navigate("/line/D")}>D</p>
        <p onClick={() => navigate("/line/E")}>E</p>
        <p onClick={() => navigate("/line/F")}>F</p>
        <p
          className="copy-btn"
          onClick={() => copy(`http://localhost:5173/analysis`)}
        >
          <ContentCopyIcon /> Copy Link
        </p>
      </div>
    </div>
  );
}
