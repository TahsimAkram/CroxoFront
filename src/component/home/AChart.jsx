import React from "react";
import ReactApexChart from "react-apexcharts";
import "./HomePage.css";

const AChart = () => {
  // Data for the chart
  const chartOptions = {
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: [
        "Jan 23",
        "Feb 23",
        "Mar 23",
        "Apr 23",
        "May 23",
        "Jun 23",
        "Jul 23",
        "Aug 23",
        "Sep 23",
        "Oct 23",
        "Nov 23",
        "Dec 23",
        "Jan 24",
        "Feb 24",
        "Mar 24",
        "Apr 24",
        "May 24",
        "Jun 24",
        "Jul 24",
        "Aug 24",
        "Sep 24",
        "Oct 24",
        "Nov 24",
        "Dec 24",
      ],
    },
    title: {
      text: "Bitcoin - BTC",
      align: "left",
      style: {
        fontSize: "15px", // Optional: specify the font size
        fontWeight: "bold", // Optional: specify the font weight
        color: "yellow", // Change the color of the title (e.g., red color)
      },
    },
  };

  const chartSeries = [
    {
      name: "Price",
      data: [
        61000, 61700, 69200, 78010, 71210, 65120, 78452, 65124, 75210, 75132,
        74261, 78430, 84521, 85214, 74623, 81245, 82365, 84124, 86512, 98421,
        106457, 104652, 102543,
      ],
    },
  ];

  return (
    <div className="drow3right">
      <ReactApexChart
        options={chartOptions}
        series={chartSeries}
        type="line" // Choose the chart type (line, bar, etc.)
        height={340} // Optional: define the chart height
      />
    </div>
  );
};

export default AChart;
