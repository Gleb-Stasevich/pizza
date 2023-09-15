import Header from "./components/Header/Header";
import Banner from "./components/Banner/Banner";
import Container from 'react-bootstrap/Container';
import CarouselStory from "./components/Carousels/CarouselStory";
import CarouselOrdersG from "./components/Carousels/CarouselOrdersG";
import Catalog from "./components/Catalog/Catalog";
import Stories from "./components/Stories/Storis";

function App() {
  return (
    <div className="App">
      <Container>
        <Banner />
        <Header />
        <CarouselStory />
        <CarouselOrdersG />
        <Catalog />
        {/* <Stories /> */}
      </Container>
    </div>
  );
}

export default App;
