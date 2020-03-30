import Head from 'next/head'
import Link from 'next/link'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import {readData} from '../lib/loader'

const findData = (countriesByDate) => {
  const countries = {}
  Object.keys(countriesByDate).map(selectedDate => {
    for (let [key, value] of Object.entries(countriesByDate[selectedDate])) {
      countries[key] = 1
    }
  })
  return {
      countries: Object.keys(countries)
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
  render() {
    const {
      countries
    } = findData(this.props.countriesByDate)

    return (
      <div className="container">
        <Head>
          <title>By Country</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          {countries.map(country =>
              <Card className="text-center" key={country}>
                <Card.Body>
                  <Card.Title>{country.replace("_", " ")}</Card.Title>
                  <Link href={`/country/${country}`}>
                    <Button variant="primary">View</Button>
                  </Link>
                </Card.Body>
              </Card>
          )}
        </main>
      </div>
    )
  }
}
