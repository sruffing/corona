import Head from 'next/head'
import { withRouter } from "next/router";
import { readData } from "../../lib/loader";
import TimeSeriesChart from "../../component/TimeSeriesChart"

export async function getStaticPaths() {
  const parsedData = readData("data/data/key-countries-pivoted_json.json");
  const countryCache = {}
  parsedData.forEach(item => {
    const { Date:date, ...countries } = item;
    Object.keys(countries).map(country => {
        countryCache[country] = 1
    })
  })

  const countryList = Object.keys(countryCache)
  return {
    paths: countryList.map(country => {
        return {
            params: {
                name: country
            }
        }
    }),
    fallback: false
  };
}

export async function getStaticProps(context) {
  const parsedData = readData("data/data/key-countries-pivoted_json.json");
  const countryName = context.params.name

  console.log("Searching by name", countryName);
  const series = parsedData.map(item => {
    const { Date:date, ...countries } = item;
    return [
        Date.parse(date),
        countries[countryName]
    ]
  });

  return {
    props: {
      series
    }
  };
}

class CountryPage extends React.Component {
  render() {
    const title = this.props.router.query.name ? this.props.router.query.name.replace('_', ' ') : ''
    return (
      <div className="container">
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <h1 className="title">{title}</h1>
        <TimeSeriesChart
            series={this.props.series}
        />
        <iframe
            width="100%"
            height="500"
        src={`https://www.bing.com/search?q=${this.props.router.query.name}+Corona+COVID-19&mkt=en-us&httpsmsn=1&msnews=1`}/>
      </div>
    );
  }
}

export default withRouter(CountryPage);
