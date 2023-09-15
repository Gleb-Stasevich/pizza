import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import logo from '../../assets/dodo-logo.png';
import Basket from '../Basket/Basket';
import './header.scss';

const Header = () => {
    return <><View /></>
}

const View = () => {
    return (
        <>
            <header>
                <Navbar>
                    <Nav className="me-auto">
                        <Nav.Link className="header__link" href="#pizzas">Пицца</Nav.Link>
                        <Nav.Link className="header__link" href="#snacks">Закуски</Nav.Link>
                        <Nav.Link className="header__link" href="#beverages">Напитки</Nav.Link>
                    </Nav>
                    <Basket />
                </Navbar>
            </header>
        </>
    )
}

export default Header;