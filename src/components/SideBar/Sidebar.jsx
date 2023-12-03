import { useEffect } from "react";
import {
  minDateFilter,
  maxDateFilter,
  genderFilter,
  clearFilter,
  ageFilter,
  navToggle,
} from "../../context/features/filterSlice";
import "./sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

export default function Sidebar() {
  const dispatch = useDispatch();
  const { minDate, maxDate, gender, age } = useSelector(
    (state) => state.filter
  );
  const [searchParams, setSearchParams] = useSearchParams({});

  useEffect(() => {
    dispatch(minDateFilter(searchParams.get("minDate") || "none"));
    dispatch(maxDateFilter(searchParams.get("maxDate") || "none"));
    dispatch(ageFilter(searchParams.get("age") || "all"));
    dispatch(genderFilter(searchParams.get("gender") || "both"));
  }, [dispatch, searchParams]);

  const genderHandler = (e) => {
    const { id } = e.target;
    setSearchParams({
      minDate: minDate,
      maxDate: maxDate,
      age: age,
      gender: gender,
    });
    dispatch(genderFilter(id));
  };

  const ageHandler = (e) => {
    const { id } = e.target;
    setSearchParams({
      minDate: minDate,
      maxDate: maxDate,
      age: age,
      gender: gender,
    });
    dispatch(ageFilter(id));
  };

  return (
    <div className="sidebar-container">
      <button
        className="button-secondary phone-btn"
        onClick={() => dispatch(navToggle())}
      >
        close
      </button>
      <p className="header-logo">
        <span>A</span>nalyse
      </p>
      <hr />
      <div className="sidebar-filter-date">
        <p>Date</p>
        <div>
          <label htmlFor="date-from">From</label>
          <input
            type="date"
            id="date-from"
            value={localStorage.getItem("minDate") || minDate}
            onChange={(e) => {
              dispatch(minDateFilter(e.target.value));
              setSearchParams({
                minDate: minDate,
                maxDate: maxDate,
                age: age,
                gender: gender,
              });
            }}
            min="2022-10-04"
            max={maxDate !== "none" ? maxDate : "2022-10-30"}
          />
        </div>
        <div>
          <label htmlFor="date-to">To</label>
          <input
            type="date"
            id="date-to"
            value={localStorage.getItem("maxDate") || maxDate}
            onChange={(e) => {
              dispatch(maxDateFilter(e.target.value));
              setSearchParams({
                minDate: minDate,
                maxDate: maxDate,
                age: age,
                gender: gender,
              });
            }}
            min={minDate !== "none" ? minDate : "2022-10-04"}
            max="2022-10-30"
          />
        </div>
      </div>
      <div className="sidebar-filter-gender">
        <p>Gender</p>
        <div>
          <input
            type="radio"
            id="Male"
            name="gender"
            value={localStorage.getItem("gender") || gender}
            onChange={genderHandler}
            checked={gender === "Male"}
          />
          <label htmlFor="Male">Male</label>
        </div>
        <div>
          <input
            type="radio"
            id="Female"
            name="gender"
            value={localStorage.getItem("gender") || gender}
            onChange={genderHandler}
            checked={gender === "Female"}
          />
          <label htmlFor="Female">Female</label>
        </div>
        <div>
          <input
            type="radio"
            id="both"
            name="gender"
            value={localStorage.getItem("gender") || gender}
            onChange={genderHandler}
            checked={gender === "both"}
          />
          <label htmlFor="both">Both</label>
        </div>
      </div>
      <div className="sidebar-filter-gender">
        <p>Age</p>
        <div>
          <input
            type="radio"
            id="15-25"
            name="age-15-25"
            value={localStorage.getItem("age") || age}
            onChange={ageHandler}
            checked={age === "15-25"}
          />
          <label htmlFor="age-15-25">15-25</label>
        </div>
        <div>
          <input
            type="radio"
            id=">25"
            name="age>25"
            value={localStorage.getItem("age") || age}
            onChange={ageHandler}
            checked={age === ">25"}
          />
          <label htmlFor="age>25">25+</label>
        </div>
        <div>
          <input
            type="radio"
            id="all"
            name="all"
            value={localStorage.getItem("age") || age}
            onChange={ageHandler}
            checked={age === "all"}
          />
          <label htmlFor="all">All</label>
        </div>
      </div>
      <div className="sidebar-buttons">
        <button
          className="button-primary"
          onClick={() => dispatch(clearFilter())}
        >
          clear
        </button>
      </div>
    </div>
  );
}
