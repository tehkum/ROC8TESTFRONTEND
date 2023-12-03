import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../context/features/DataSlice";
import Sidebar from "../components/SideBar/Sidebar";
import BarAnalysis from "./BarAnalysis";

export default function Analysis() {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.data);
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

  return (
    <div className="page-container">
      {isNavVisible && <Sidebar />}
      {!isNavVisible && nav && (
        <div className="phone-nav">
          {" "}
          <Sidebar />
        </div>
      )}
    

      <BarAnalysis />
    </div>
  );
}
