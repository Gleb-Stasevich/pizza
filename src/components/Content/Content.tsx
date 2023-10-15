import { StickyContainer, Sticky } from 'react-sticky';

import { Container } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import CarouselStory from '../Carousels/CarouselStory';
import CarouselOrders from '../Carousels/CarouselOrders';
import Catalog from '../Catalog/Catalog';
import Basket from '../Basket/Basket';

import './header.scss';

const Content = () => {
    return <><View /></>
}

const View = () => {
    return (
        <StickyContainer>
            <Sticky>
                {({
                    style
                }) => (
                    <header style={style}>
                        <Navbar className="d-flex flex-wrap">
                            <Nav className="me-auto">
                                <Nav.Link className="header__link" href="#pizzas">Пицца</Nav.Link>
                                <Nav.Link className="header__link" href="#snacks">Закуски</Nav.Link>
                                <Nav.Link className="header__link" href="#beverages">Напитки</Nav.Link>
                            </Nav>
                            <Basket />
                        </Navbar>
                    </header>
                )}
            </Sticky>
            <Container>
                <CarouselStory />
                <CarouselOrders />
                <Catalog />
            </Container>
        </StickyContainer>
    );
}

export default Content;