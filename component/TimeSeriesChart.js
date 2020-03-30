import React, { Component } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsExporting from "highcharts/modules/exporting";

if (typeof Highcharts === "object") {
  HighchartsExporting(Highcharts);
}

const options = {
  title: {
    text: "Infections"
  }
};

export default class TimeSeriesChart extends Component {
  constructor() {
    super();
    this.chartComponent = React.createRef();
  }
  componentDidMount() {
    const container = this.chartComponent.current.container.current;
    const table = document.getElementsByClassName("table")[0];

    container.style.height = table.clientHeight + "px";
    this.chartComponent.current.chart.reflow();
  }
  render() {
    const chartOptions = {
      xAxis: {
        type: "datetime"
      },
      yAxis: {
        title: {
          text: "# of Infections"
        }
      },
      series: [
        {
          name: `Infections`,
          type: "area",
          data: this.props.series
        }
      ],
      ...options
    };
    return (
      <HighchartsReact
        className="chart"
        highcharts={Highcharts}
        options={chartOptions}
        ref={this.chartComponent}
      />
    );
  }

  componentDidMount() {}
}
