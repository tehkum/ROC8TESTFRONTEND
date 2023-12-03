export const dataFormatter = (data) => {
  const formedData = [
    { type: "A", value: 0 },
    { type: "B", value: 0 },
    { type: "C", value: 0 },
    { type: "D", value: 0 },
    { type: "E", value: 0 },
    { type: "F", value: 0 },
  ];

  for (let i = 0; i < data.length; i++) {
    formedData[0].value += data[i].A.result || 0;
    formedData[1].value += data[i].B.result || 0;
    formedData[2].value += data[i].C.result || 0;
    formedData[3].value += data[i].D.result || 0;
    formedData[4].value += data[i].E.result || 0;
    formedData[5].value += data[i].F.result || 0;
  }

  return formedData;
};
