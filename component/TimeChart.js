import React, { Component } from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import HighchartsExporting from 'highcharts/modules/exporting'

if (typeof Highcharts === 'object') {
    HighchartsExporting(Highcharts)
}

const options = {
    title: {
      text: 'Positive Tests by Country'
    },
    xAxis: {
      min: null,
      max: null
    },
    yAxis: {
      min: null,
      max: null
    }

  }

export default class TimeChart extends Component {
    constructor(){
        super()
        this.chartComponent = React.createRef();
    }
    render() {
        const chartOptions = {
          series: [{
            name: 'Positive Tests',
            type: 'bar',
            data: this.props.series
          }],
          ...options
        }
        if (this.props.fixXAxis) {
          chartOptions.yAxis = {
            ...chartOptions.yAxis,
            min: 0,
            max: 300000
          }
        }
        if (this.props.categories) {
          chartOptions.xAxis = {
            ...chartOptions.xAxis,
            categories: this.props.categories,
          }
        }
        return (
            <HighchartsReact className="chart"
                highcharts={Highcharts}
                options={chartOptions}
                ref={this.chartComponent}
            />
        )
    }

    componentDidMount() {
    }
}

