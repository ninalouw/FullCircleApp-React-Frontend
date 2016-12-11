import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const GoalDoughnutChart = (props) => {
  const goalMinutes = props.goals.map((goal) => {
    return goal.minutes;
  });

  const goalNames = props.goals.map((goal) => {
    return goal.name;
  });
  console.log("These are the minutes", goalMinutes);
  console.log("These are our goal names", goalNames);

  const data = {
    labels: goalNames,
    datasets: [
      {
        data: goalMinutes,
        backgroundColor: [
          "#FF6384",
          "rgb(119, 38, 152)",
          "rgb(117, 233, 146)",
          "rgb(193, 7, 52)",
          "rgb(39, 165, 199)"
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56"
        ]
      }]
  };
  return (
    <div>
      <Doughnut data={data}/>
    </div>
  );
};
export default GoalDoughnutChart;
