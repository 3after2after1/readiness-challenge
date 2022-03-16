// import "../App.css";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
// import axios from "axios";
import { Prices } from "./constant";

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

function StaticChart3(props) {
  const [series, setSeries] = useState([
    {
      data: [],
    },
  ]);

  useEffect(() => {
    let timeoutId;
    const getLatestPrice = async () => {
      try {
        console.log(props.range);

        let filteredData = Prices.map((row) => {
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
  }, []);

  return (
    <div className="static">
      <h3
        className="previousClose"
        style={{ marginTop: "1rem", backgroundColor: "lightgrey" }}
      >
        Previous Close: $123
      </h3>
      <Chart
        options={chart.options}
        series={series}
        type="area"
        width={330}
        height={170}
      />
    </div>
  );
}

export default StaticChart3;
