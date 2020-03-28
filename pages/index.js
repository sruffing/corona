import Head from 'next/head'
import TimeChart from '../component/TimeChart'
import fs from 'fs'
import path from 'path'

const readData = (filePath) => {
  const file = path.join(process.cwd(), filePath)
  const fileContents = fs.readFileSync(file, 'utf8')
  return JSON.parse(fileContents)
}

const findData = (countriesByDate, selectedDate) => {
  const dates = Object.keys(countriesByDate)
  const series = []
  const countries = []

  const date = selectedDate
  for (let [key, value] of Object.entries(countriesByDate[date])) {
    countries.push(key.replace("_", " "))
    series.push({
      y: value,
      name: key
    })
  }

  return {
      dates,
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
  return {
    props: {
      countriesByDate
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
    this.timer = setInterval(() => {
      const date = new Date(self.state.selectedDate)
      date.setDate(date.getDate() + 1)
      const selectedDate = date.toISOString().split('T')[0]
      self.setState({
        selectedDate
      })
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
      categories,
      dates
    } = findData(this.props.countriesByDate, this.state.selectedDate)
    const controls =
      this.state.play === false ?
      <button onClick={this.handlePlay}>
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

    <main>
      <h1 className="title">
        Corona Virus Application
      </h1>
      {controls}

      <select onChange={this.handleChange} value={this.state.selectedDate}>
      {dates.map(date =>
        <option value={date} key={date}>{date}</option>
      )}
      </select>
      <TimeChart series={series}
        categories={categories}/>
    </main>

    <footer>
      Project by Scott Ruffing. Data provided by <a href="https://github.com/datasets/covid-19">Johns Hopkins</a>
    </footer>

    <style jsx>{`
      .container {
        min-height: 100vh;
        padding: 0 0.5rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      main {
        padding: 5rem 0;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      footer {
        width: 100%;
        height: 100px;
        border-top: 1px solid #eaeaea;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      footer img {
        margin-left: 0.5rem;
      }

      footer a {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      a {
        color: inherit;
        text-decoration: none;
      }

      .title a {
        color: #0070f3;
        text-decoration: none;
      }

      .title a:hover,
      .title a:focus,
      .title a:active {
        text-decoration: underline;
      }

      .title {
        margin: 0;
        line-height: 1.15;
        font-size: 4rem;
      }

      .title,
      .description {
        text-align: center;
      }

      .description {
        line-height: 1.5;
        font-size: 1.5rem;
      }

      code {
        background: #fafafa;
        border-radius: 5px;
        padding: 0.75rem;
        font-size: 1.1rem;
        font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
          DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
      }

      .grid {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;

        max-width: 800px;
        margin-top: 3rem;
      }

      .card {
        margin: 1rem;
        flex-basis: 45%;
        padding: 1.5rem;
        text-align: left;
        color: inherit;
        text-decoration: none;
        border: 1px solid #eaeaea;
        border-radius: 10px;
        transition: color 0.15s ease, border-color 0.15s ease;
      }

      .card:hover,
      .card:focus,
      .card:active {
        color: #0070f3;
        border-color: #0070f3;
      }

      .card h3 {
        margin: 0 0 1rem 0;
        font-size: 1.5rem;
      }

      .card p {
        margin: 0;
        font-size: 1.25rem;
        line-height: 1.5;
      }

      @media (max-width: 600px) {
        .grid {
          width: 100%;
          flex-direction: column;
        }
      }
    `}</style>

    <style jsx global>{`
      html,
      body {
        padding: 0;
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
          Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
      }

      * {
        box-sizing: border-box;
      }
    `}</style>
  </div>
    )
}
}
