import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Navbar bg="light" expand="md">
      <Navbar.Brand href="/">Corona</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/ByDate">By Date</Nav.Link>
          <Nav.Link href="/ByCountry">By Country</Nav.Link>
          <Nav.Link href="https://github.com/sruffing/corona">About</Nav.Link>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-success">Search</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
    <Component {...pageProps} />
    <footer>
      Project by Scott Ruffing. Data provided by <a href="https://github.com/datasets/covid-19">Johns Hopkins</a>
    </footer>
    </div>
  )
}