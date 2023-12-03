import { BarChart } from "@mui/x-charts/BarChart";
import PropTypes from "prop-types";
import { dataFormatter } from "../../utils/DataFormatter";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { fetchFilter } from "../../context/features/filterSlice";

const chartSetting = {
  xAxis: [
    {
      label: "Total Time Spent",
    },
  ],
  width: 500,
  height: 400,
};

const Bar = ({ data }) => {
  const { minDate, maxDate, gender, age } = useSelector(
    (state) => state.filter
  );
  const dispatch = useDispatch();

  const filteredDate = useMemo(() => {
    return minDate === "none" || maxDate === "none"
      ? data
      : data.filter((item) => {
          const itemDate = new Date(
            item?.Day?.result ? item?.Day?.result : item?.Day
          );
          const min = new Date(`${minDate}T00:00:00.000Z`);
          const max = new Date(`${maxDate}T23:59:59.999Z`);

          return (!min || itemDate >= min) && (!max || itemDate <= max);
        });
  }, [minDate, maxDate, data]);

  const filteredGender = useMemo(
    () =>
      gender === "both"
        ? filteredDate
        : filteredDate?.filter((item) =>
            item.Gender.result
              ? item.Gender.result === gender
              : item.Gender === gender
          ),
    [gender, filteredDate]
  );

  const ageFilter = useMemo(() => {
    return age === "all"
      ? filteredGender
      : filteredGender?.filter((item) =>
          item.Age.result ? item.Age.result === age : item.Age === age
        );
  }, [filteredGender, age]);

  useEffect(() => {
    dispatch(fetchFilter());
  }, [dispatch]);

  return (
    <div style={{ maxWidth: "100vw", overflow: "auto" }}>
      <BarChart
        dataset={dataFormatter(ageFilter)}
        yAxis={[{ scaleType: "band", dataKey: "type", label: "Series" }]}
        series={[{ dataKey: "value", label: "Value" }]}
        layout="horizontal"
        {...chartSetting}
      />
    </div>
  );
};

Bar.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
};

export default Bar;
