import "../App.css";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";

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
        var x = new XMLHttpRequest();
        let response = null;
        x.open(
          "GET",
          `https://cors-anywhere.herokuapp.com/https://query1.finance.yahoo.com/v8/finance/chart/${props.symbol}?region=US&lang=en-US&includePrePost=false&interval=${props.interval}&useYfid=true&range=${props.range}`
        );

        x.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        x.onload = function () {
          response = JSON.parse(x.responseText);
          const data = response.chart.result[0];
          setPreviousClose(data.meta.previousClose);
          let y = data.indicators.quote[0].close;
          const average = y.reduce((a, b) => a + b) / y.length;
          // y = data.indicators.quote[0].close.map((value, index, arr) => {
          //   return value.toFixed(4)
          //     ? +value
          //     : getRandomElement(y, Math.floor(Math.random(y.length)), average);
          // });

          // const prices = data.timestamp
          //   .map((x) => [new Date(x * 1000)])
          //   .map((val, index) => val.concat(y[index]));

          let prices = y.filter((price) => price !== null);
          prices = prices.map((value, index) => {
            return [new Date(data.timestamp[index] * 1000)].concat(
              value.toFixed(4)
            );
          });

          setSeries([
            {
              data: prices,
            },
          ]);
        };
        x.send();
        // timeoutId = setTimeout(getLatestPrice, 10000);
      } catch (error) {
        console.log(error);
      }
    };
    getLatestPrice();

    // return () => {
    //   clearTimeout(timeoutId);
    // };
  }, [props.range]);

  return (
    <div className="static">
      <h3
        className="previousClose"
        style={{ marginTop: "1rem", backgroundColor: "lightgrey" }}
      >
        Previous Close: {previousClose}
      </h3>
      <Chart
        options={chart.options}
        series={series}
        type="area"
        width={400}
        height={200}
      />
    </div>
  );
}

export default StaticChart;
