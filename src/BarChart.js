import React from 'react';
import { Bar } from 'react-chartjs-2';

//from goalItem we have access to props.count and props.name

const GoalBarChart = (props) => {
//   const goalDayCount = props.goals.map((goal) => {
//     return goal.count_consecutive_days_completed;
//   });
//   const goalNames = props.goals.map((goal) => {
//     return goal.name;
//   });

  const data = {
    labels: [props.name],
    datasets: [
      {
        data: [props.count],
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

  const options = {
    scales: {
      gridLines: [{
        display: false
      }],
      xAxes: [{
        barThickness: 40,
        categoryPercentage: 0.1,
        barPercentage: 1.0,
        display: false
      }],
      yAxes: [{
        display: true
      }]
    }
  };

  return (
     <div>
       <Bar data={data} options={options}/>
     </div>
  );
};

export default GoalBarChart;
