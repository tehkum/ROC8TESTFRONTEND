import { LineChart } from "@mui/x-charts/LineChart";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { fetchFilter } from "../../context/features/filterSlice";

function LineData({ data, type }) {
  const { minDate, maxDate, gender, age } = useSelector(
    (state) => state.filter
  );
  const [count, setCount] = useState(1);
  const dispatch = useDispatch();

  const filteredDate = useMemo(() => {
    return minDate === "none" || maxDate === "none"
      ? data
      : data?.filter((item) => {
          const itemDate = new Date(
            item?.Day.result ? item?.Day.result : item?.Day
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
          item?.Age.result ? item?.Age.result === age : item?.Age === age
        );
  }, [filteredGender, age]);

  const dataFormatter = (data) => {
    const newData = data?.reduce(
      (acc, item) => [
        ...acc,
        item[type]?.result ? item[type]?.result : item[type],
      ],
      []
    );

    return newData;
  };

  useEffect(() => {
    dispatch(fetchFilter());
  }, [dispatch]);

  return (
    <div style={{ maxWidth: "100vw", overflow: "auto" }}>
      <LineChart
        xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
        series={[
          {
            data: dataFormatter(ageFilter)?.filter(
              (_, index) => index >= (count - 1) * 6 && index < 6 * count
            ),
          },
        ]}
        width={500}
        height={300}
      />
      <div className="btn-grp">
        <button
          className="button-secondary"
          onClick={() => setCount((prev) => (prev > 1 ? prev - 1 : prev))}
        >
          Previous 6 Data
        </button>
        <button
          className="button-primary"
          onClick={() =>
            setCount((prev) =>
              filteredGender?.length >= prev * 6 ? prev + 1 : prev
            )
          }
        >
          Next 6 Data
        </button>
      </div>
    </div>
  );
}

LineData.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  type: PropTypes.string,
};

export default LineData;
