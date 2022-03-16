import "../App.css";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";

const chart = {
  options: {
    chart: {
      id: "area-datetime",
      type: "area",
      height: 350,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    // colors: ["#A9A9A9"],
    dataLabels: {
      enabled: false,
    },
    annotations: {
      xaxis: [
        {
          label: {
            show: false,
          },
        },
      ],
    },

    xaxis: {
      type: "datetime",
      show: false,
      labels: {
        show: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    yaxis: {
      show: false,
      decimalsInFloat: 4,
    },
    grid: {
      show: false,
    },
    tooltip: {
      y: {
        show: true,
        title: "",
      },
      x: {
        show: true,
        format: "dd MMM yyyy HH:mm",
        formatter: undefined,
        title: undefined,
      },
      title: {
        name: undefined,
      },
      theme: "dark",
    },
  },
};

const getRandomElement = (arr, index, average) => {
  let num = arr[index];
  if (num != null && num > average) {
    return arr[index];
  } else {
    getRandomElement(arr, Math.floor(Math.random(arr.length)), average);
  }
};

function StaticChart(props) {
  const [series, setSeries] = useState([
    {
      data: [],
    },
  ]);

  const [previousClose, setPreviousClose] = useState(null);

  useEffect(() => {
    let timeoutId;
    const getLatestPrice = async () => {
      try {
        console.log(props.range);

        let response = await axios.get("http://localhost:5001/livepricefeed");
        console.log(response.data[0].Prices);
        let filteredData = response[0].Prices.map((row) => {
          return [row.ToTime, row.Price];
        });

        setSeries([
          {
            data: filteredData,
          },
        ]);
      } catch (error) {
        console.log(error);
      }
    };
    getLatestPrice();

    // return () => {
    //   clearTimeout(timeoutId);
    // };
  }, []);

  return (
    <div className="static">
      <h3
        className="previousClose"
        style={{ marginTop: "1rem", backgroundColor: "lightgrey" }}
      >
        Previous Close:
        <br />
        {/* {previousClose} */}
      </h3>
      <Chart
        options={chart.options}
        series={series}
        type="area"
        width={320}
        height={200}
      />
    </div>
  );
}

export default StaticChart;
