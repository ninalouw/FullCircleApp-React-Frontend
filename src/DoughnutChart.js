import React from 'react';
import DoughnutChart from "react-chartjs";
// var DoughnutChart = require("react-chartjs").Doughnut;
const chartData = {
 //goals
};

const chartOptions = {

};

const GoalDoughnutChart = (props) => {
  return (
  <DoughnutChart
    goals={props.goals}
    data={chartData}
    options={chartOptions} width="600" height="250"/>
  );
};

export default GoalDoughnutChart;
