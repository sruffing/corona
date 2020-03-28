import React, { Component } from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import HighchartsExporting from 'highcharts/modules/exporting'

if (typeof Highcharts === 'object') {
    HighchartsExporting(Highcharts)
}

const options = {
    title: {
      text: 'My chart'
    }
  }

export default class TimeChart extends Component {
    constructor(){
        super()
        this.chartComponent = React.createRef();
    }
    componentDidMount(){
        debugger
        const container = this.chartComponent.current.container.current;
        const table = document.getElementsByClassName('table')[0];

        container.style.height = table.clientHeight + 'px';
        this.chartComponent.current.chart.reflow();
      }
    render() {
        const chartOptions = {
          series: [{
            name: 'Test Data',
            type: 'bar',
            data: this.props.series
          }],
          ...options
        }
        if (this.props.categories) {
          chartOptions.xAxis = {
            categories: this.props.categories
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

