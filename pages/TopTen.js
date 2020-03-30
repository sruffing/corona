import Head from 'next/head'
import TimeChart from '../component/TimeChart'
import fs from 'fs'
import path from 'path'
import Alert from 'react-bootstrap/Alert'

const readData = (filePath) => {
  const file = path.join(process.cwd(), filePath)
  const fileContents = fs.readFileSync(file, 'utf8')
  return JSON.parse(fileContents)
}

const findData = (countriesByDate, selectedDate) => {
  const series = []
  const countries = []
  for (let [key, value] of Object.entries(countriesByDate[selectedDate])) {
    countries.push(key.replace("_", " "))
    series.push({
      y: value,
      name: key
    })
  }
  return {
      series,
      categories: countries
  }
}

export async function getStaticProps() {
  const parsedData = readData('data/data/key-countries-pivoted_json.json')
  const countriesByDate = {}
  parsedData.forEach(item => {
    const { Date, ...countries } = item
    countriesByDate[item.Date] = countries
  })
  const dates = Object.keys(countriesByDate)

  return {
    props: {
      countriesByDate,
      dates
    }
  }
}

export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedDate: "2020-01-22",
      play: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handlePlay = this.handlePlay.bind(this)
    this.handleStop = this.handleStop.bind(this)
  }

  handlePlay() {
    const self = this
    this.setState({
      play: true
    })
    const {dates} = self.props
    this.timer = setInterval(() => {
      const index = dates.findIndex(date => date === self.state.selectedDate)
      if (dates[index + 1]) {
        self.setState({
          selectedDate: dates[index + 1]
        })
      } else {
        self.handleStop()
      }
    }, 500)
  }
  handleStop() {
    this.setState({
      play: false
    })
    if (this.timer) {
      clearTimeout(this.timer)
    }
  }
  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer)
    }
  }
  handleChange(event) {
    const { target } = event.nativeEvent
    const date = target[target.selectedIndex].text
    this.setState({
      selectedDate: date
    })
  }
  render() {
    const {
      series,
      categories
    } = findData(this.props.countriesByDate, this.state.selectedDate)
    const controls =
      this.state.play === false ?
      <button type="button" className="btn btn-primary" onClick={this.handlePlay}>
        Play >
      </button> :
      <button onClick={this.handleStop}>
        Stop ||
      </button>

    return (
  <div className="container">
    <Head>
      <title>Create Next App</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Alert variant="primary">Hello</Alert>
    <main>
      <h1 className="title">
        Corona Virus Application
      </h1>
      {controls}

      <select onChange={this.handleChange} value={this.state.selectedDate}>
      {this.props.dates.map(date =>
        <option value={date} key={date}>{date}</option>
      )}
      </select>
      <TimeChart series={series}
        categories={categories}/>
    </main>

    <footer>
      Project by Scott Ruffing. Data provided by <a href="https://github.com/datasets/covid-19">Johns Hopkins</a>
    </footer>
  </div>
  )
}
}
