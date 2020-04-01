import Head from "next/head";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
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
          <Container>
            <Row>
              <Col border="light"className="d-flex">
                <Card className="flex-fill" style={{ width: "18rem" }}>
                  <Card.Img variant="top" src="/img/bydate.jpg" />
                  <Card.Body>
                    <Card.Title>By Date</Card.Title>
                    <Card.Text>View historical information by date</Card.Text>
                    <Link href="/ByDate">
                      <Button variant="primary">View</Button>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
              <Col className="d-flex">
                <Card className="flex-fill" style={{ width: "18rem" }}>
                  <Card.Img variant="top" src="/img/countries.jpg" />
                  <Card.Body>
                    <Card.Title>By Country</Card.Title>
                    <Card.Text>
                      View historical information per country
                    </Card.Text>
                    <Link href="/ByCountry">
                      <Button variant="primary">View</Button>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </main>
      </div>
    );
  }
}
