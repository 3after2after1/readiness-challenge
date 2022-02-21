import React from "react";
import PropTypes from "prop-types";

import { format } from "d3-format";
import { timeFormat } from "d3-time-format";

import { ChartCanvas, Chart } from "react-stockcharts";
import {
  ScatterSeries,
  CircleMarker,
  LineSeries,
} from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import {
  CrossHairCursor,
  MouseCoordinateX,
  MouseCoordinateY,
  EdgeIndicator,
} from "react-stockcharts/lib/coordinates";

import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import { fitWidth } from "react-stockcharts/lib/helper";
import { last } from "react-stockcharts/lib/utils";

class LineAndScatterChart extends React.Component {
  render() {
    const { data: initialData, type, width, ratio } = this.props;
    const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(
      (d) => d.date
    );
    const { data, xScale, xAccessor, displayXAccessor } =
      xScaleProvider(initialData);
    const xExtents = [xAccessor(last(data)), xAccessor(data[data.length - 20])];
    return (
      <ChartCanvas
        ratio={ratio}
        width={width}
        height={400}
        margin={{ left: 70, right: 70, top: 20, bottom: 30 }}
        type={type}
        pointsPerPxThreshold={1}
        seriesName="MSFT"
        data={data}
        xAccessor={xAccessor}
        displayXAccessor={displayXAccessor}
        xScale={xScale}
        xExtents={xExtents}
      >
        <Chart id={1} yExtents={(d) => [d.high, d.low, d.AAPLClose, d.GEClose]}>
          <XAxis axisAt="bottom" orient="bottom" />
          <YAxis
            axisAt="right"
            orient="right"
            // tickInterval={5}
            // tickValues={[40, 60]}
            ticks={5}
          />

          <EdgeIndicator
            itemType="last"
            orient="right"
            edgeAt="right"
            yAccessor={(d) => d.close}
            fill={(d) => (d.close > d.open ? "#A2F5BF" : "#F9ACAA")}
            stroke={(d) => (d.close > d.open ? "#0B4228" : "#6A1B19")}
            textFill={(d) => (d.close > d.open ? "#0B4228" : "#420806")}
            strokeOpacity={1}
            strokeWidth={3}
            arrowWidth={2}
          />

          <MouseCoordinateX
            at="bottom"
            orient="bottom"
            displayFormat={timeFormat("%Y-%m-%d %H:%M:%S %p")}
          />
          <MouseCoordinateY
            at="right"
            orient="right"
            displayFormat={format(".2f")}
          />

          <LineSeries yAccessor={(d) => d.close} strokeDasharray="LongDash" />
          <ScatterSeries
            yAccessor={(d) => d.close}
            marker={CircleMarker}
            markerProps={{ r: 3 }}
          />
        </Chart>

        <CrossHairCursor />
      </ChartCanvas>
    );
  }
}

LineAndScatterChart.propTypes = {
  data: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  ratio: PropTypes.number.isRequired,
  type: PropTypes.oneOf(["svg", "hybrid"]).isRequired,
};

LineAndScatterChart.defaultProps = {
  type: "svg",
};
LineAndScatterChart = fitWidth(LineAndScatterChart);

export default LineAndScatterChart;
