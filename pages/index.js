import Head from "next/head";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Link from "next/link";
import { readData } from "../lib/loader";

export async function getStaticProps() {
  const parsedData = readData("data/data/key-countries-pivoted_json.json");
  const countriesByDate = {};
  parsedData.forEach(item => {
    const { Date, ...countries } = item;
    countriesByDate[item.Date] = countries;
  });
  const dates = Object.keys(countriesByDate);

  return {
    props: {
      countriesByDate,
      dates
    }
  };
}

export default class Home extends React.Component {
  render() {
    return (
      <div className="container">
        <Head>
          <title>Corona</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src="/img/countries.jpg" />
            <Card.Body>
              <Card.Title>By Country</Card.Title>
              <Card.Text>View historical information per country</Card.Text>
              <Link href="/ByCountry">
                <Button variant="primary">View</Button>
              </Link>
            </Card.Body>
          </Card>
        </main>

        <footer>
          Project by Scott Ruffing. Data provided by{" "}
          <a href="https://github.com/datasets/covid-19">Johns Hopkins</a>
        </footer>
      </div>
    );
  }
}
