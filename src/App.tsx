import Content from "./components/Content/Content";
import Banner from "./components/Banner/Banner";
import Container from 'react-bootstrap/Container';

function App() {
  return (
    <div className="App">
      <Container>
        <Banner />
      </Container>
      <Content />
    </div>
  );
}

export default App;
