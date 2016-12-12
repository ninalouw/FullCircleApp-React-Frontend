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
          "#F7464A",
          "#46BFBD",
          "rgb(246, 224, 76)",
          "rgb(246, 138, 50)",
          "rgb(8, 233, 125)",
          "#4D5360",
          "rgb(46, 201, 235)",
          "rgb(73, 101, 185)",
          "rgb(161, 87, 196)",
          "rgb(201, 44, 143)",
          "rgb(158, 4, 18)"
        ],
        hoverBackgroundColor: [
          "#FF5A5E",
          "#5AD3D1",
          "rgb(246, 240, 92)",
          "rgb(242, 118, 57)",
          "rgb(106, 219, 141)",
          "#616774",
          "rgb(97, 190, 214)",
          "rgb(105, 123, 213)",
          "rgb(184, 73, 212)",
          "rgb(207, 87, 169)",
          "rgb(171, 44, 48)"
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
