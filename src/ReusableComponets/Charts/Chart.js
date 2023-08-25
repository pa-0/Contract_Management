import React from "react";
import dynamic from "next/dynamic";
import { useTheme } from "@mui/material";
const Charts = dynamic(() => import("react-apexcharts"), { ssr: false });

const Chart = ({ optionsreport, seriesreport, type, height }) => {
  return (
    <Charts
      options={optionsreport}
      series={seriesreport}
      type={type}
      height={height}
    />
  );
};

export default Chart;
