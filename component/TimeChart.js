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
    },
    series: [{
      name: 'Test Data',
      type: 'line',
      data: [{
          x: 1,
          y: 9,
          name: "Point 2"
      },
      { x: 2,
        y:4,
        name: "Point 1"
        }
      ]
    }]
  }

export default class TimeChart extends Component {
    constructor(){
        super()
        this.chartComponent = React.createRef();
    }
    componentDidMount(){
        const container = this.chartComponent.current.container.current;
        const table = document.getElementsByClassName('table')[0];

        container.style.height = table.clientHeight + 'px';
        this.chartComponent.current.chart.reflow();
      }
    render() {
        return (
            <HighchartsReact className="chart"
                highcharts={Highcharts}
                options={options}
                ref={this.chartComponent}
            />
        )
    }

    componentDidMount() {
    }
}

