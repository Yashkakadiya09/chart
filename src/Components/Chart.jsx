import React, { useEffect, useState } from "react";
import DATA from "./data/Data";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from "chart.js";

const Charts = () => {
  const [chartData, setChartData] = useState(null);
  

  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const createData = (data) => {
    let array = [];

    for (let i = 0; i < month.length; i++) {
      const element = month[i];
      let existMonth = data?.find((item) => item.month === element);

      let newData = {
        labels: [element],
        datasets: [
          {
            label: "2024",
            data: [existMonth?.CY_Revenue ? existMonth?.CY_Revenue : 0],
            backgroundColor: "green",
            stack: "Stack 1",
            type: "bar",
          order:1
          },
          {
            label: "STLY",
            data: [existMonth?.LY_Revenue ? existMonth?.LY_Revenue : 0],
            backgroundColor: "blue",
            stack: "Stack 2",
            type: "bar",
            order: 1,
          },
          {
            label: "Occupancy",
            data: [existMonth?.occ ? existMonth?.occ : 0],
            borderColor: "#919191",
            fill: false,
            backgroundColor: "#919191",
            type: "line",
            yAxisID: "y2",
            order: 0,
          },
        ],
      };

      if (array.length > 0) {
        array.forEach((item) => {
          item.labels.push(element);
          item.datasets[0].data.push(
            existMonth?.CY_Revenue ? existMonth?.CY_Revenue : 0
          );
          item.datasets[1].data.push(
            existMonth?.LY_Revenue ? existMonth?.LY_Revenue : 0
          );

          item.datasets[2].data.push(existMonth?.occ ? existMonth?.occ : 0);
        });
      } else {
        array.push(newData);
      }
    }

    setChartData(array[0]);
  };


  useEffect(() => {
    createData(DATA);
   
  }, []);
  const options = {
    responsive: true,
    barThickness: 25,
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false,
        },
      },
      y: {
        stacked: true,
        grid: {
          display: true,
        },
        ticks: {
          stepSize: 100,
          callback: function (value, index, values) {
            return `$${value}`;
          },
        },
      },
      y2: {
        stacked: false,
        min: 0,
        max: 100,
        beginAtZero: true,
        type: "linear",
        position: "right",
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          //   min: 0,
          //   max: 100,
          stepSize: 10,
          callback: function (value, index, values) {
            return `${value} %`;
          },
        },
      },
    },
    plugins: {
      tooltip: {
        mode: "index",
        intersect: false,
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";
            let value = context.formattedValue;
            if (label === "STLY" || label === `${new Date().getFullYear()}`) {
              label += ": $" + value;
            } else if (label === "Occupancy") {
              label += ": " + value + "%";
            }

            return label;
          },
        },
      },
      legend: {
        display: true,
        align: "end",
        position: "top",
        maxWidth: 20,
        maxHeight: 100,
        labels: {
          boxWidth: 10,
          boxHeight: 10,
        },
      },
    },
    aspectRatio: 3.5 / 1,

    maintainAspectRatio: true,
  };
  
  Chart.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
    PointElement,
    LineElement
  );

 
  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "45vw",
          flexDirection: "column",
        }}
      >
        <h2>Bar Chart </h2>
        {chartData && (
          <Bar
            style={{
                minHeight: "30vw",
                maxHeight:"40vw"
            }}
            data={chartData}
            options={options}
          />
        )}
      </div>
    </>
  );
};

export default Charts;
