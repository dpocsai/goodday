import React from "react";

import CalenderChart from "./CalenderChart";
import MobileCalendar from "./MobileCalendar";
import OverallData from "./OverallData";
import DataGridTable from "../DataGridTable";

const Data = () => {
  return (
    <>
      {window.innerWidth < 1200 ? <MobileCalendar /> : <CalenderChart />}
      <OverallData />
      <DataGridTable />
    </>
  );
};

export default Data;
