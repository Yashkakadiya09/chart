import React, { useEffect, useState } from "react";
import DATA2 from "./data/Data2";
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

const StackChart = () => {
  Chart.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
    PointElement,
    LineElement
  );
  const [chartData, setChartData] = useState(null);
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const createData = (data) => {
    let array = [];

    for (let i = 0; i < days.length; i++) {
      const element = days[i];
      let existDay = data?.find((item) => item.Day === element);

      let newData = {
        labels: [element],
        datasets: [
          {
            label: "LOS1",
            data: [existDay?.LOS1 ? existDay?.LOS1 : 0],
            backgroundColor: "green",
            order: 1
          },
          {
            label: "LOS2",
            data: [existDay?.LOS2 ? existDay?.LOS2 : 0],
            backgroundColor: "red",
            order: 1
          },
          {
            label: "LOS3",
            data: [existDay?.LOS3 ? existDay?.LOS3 : 0],
            backgroundColor: "blue",
            order: 1
          },
          {
            label: "LOS4",
            data: [existDay?.LOS4 ? existDay?.LOS4 : 0],
            backgroundColor: "yellow",
            order: 1
          },
          {
            label: "LOS5",
            data: [existDay?.LOS5 ? existDay?.LOS5 : 0],
            backgroundColor: "orange",
            order: 1
          },
          {
            label: "LOS6",
            data: [existDay?.LOS6 ? existDay?.LOS6 : 0],
            backgroundColor: "pink",
            order: 1
          },
          {
            label: "Occupancy",
            data: [existDay?.Occperc ? existDay?.Occperc : 0],
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
          item.datasets[0].data.push(existDay?.LOS1 ? existDay?.LOS1 : 0);
          item.datasets[1].data.push(existDay?.LOS2 ? existDay?.LOS2 : 0);
          item.datasets[2].data.push(existDay?.LOS3 ? existDay?.LOS3 : 0);
          item.datasets[3].data.push(existDay?.LOS4 ? existDay?.LOS4 : 0);
          item.datasets[4].data.push(existDay?.LOS5 ? existDay?.LOS5 : 0);
          item.datasets[5].data.push(existDay?.LOS6 ? existDay?.LOS6 : 0);
          item.datasets[6].data.push(existDay?.Occperc ? existDay?.Occperc : 0);
        });
      } else {
        array.push(newData);
      }
    }

    setChartData(array[0]);
  };

  useEffect(() => {
    createData(DATA2);
  }, []);

  const options = {
    responsive: true,
    barThickness: 100,
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false,
        },
      },
      y: {
        stacked: true,
        ticks: {
          stepSize: 50,
        },
        grid: {
          display: true,
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
        // ticks: {
        //   callback: function (value, index, values) {
        //     return `${value * 100} %`;
        //   },
        // },
        ticks: {
          min: 0,
          max: 100,
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
        <h2>Stack Chart </h2>
        {chartData && (
          <Bar
            style={{
              minHeight: "30vw",
              maxHeight: "40vw",
            }}
            data={chartData}
            options={options}
          />
        )}
      </div>
    </>
  );
};

export default StackChart;
