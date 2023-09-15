import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Modal } from "react-bootstrap";
import logo from '../../assets/dodo-logo.png';
import search from './search.png';
import './modalItemPizzerias.scss';

const ModalPizzerias = (props: any) => {

    let { pizzerias } = useSelector((state: RootState) => state);
    return (
        <>
            <Modal className="modal-pizzerias"
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <div className="modal-pizzerias__header d-flex align-items-center">
                        <div className="modal-pizzerias__img">
                            <img src={logo} alt="logo" />
                        </div>
                        <div className="modal-pizzerias__citys">
                            <h1>945 пиццерий в {pizzerias.length} странах</h1>
                        </div>
                    </div>
                    <div className="modal-pizzerias__search position-relative pt-4 pb-5">
                        <label htmlFor="search"><img className="position-absolute" src={search} alt="search"></img></label>
                        <input id="search" placeholder="Поиск..." type="text" />
                    </div>
                    <div className="modal-item__pizzerias d-flex">
                        <div className="pizzerias">
                            {
                                pizzerias.map((elem: any, index) => {
                                    if (index < 6) {
                                        return (
                                            <div onClick={() => { props.setDeliveryСity(undefined, elem.city) }} className="city position-relative">
                                                {elem.letter ? <span className="first-letter position-absolute">{elem.letter}</span> : null}
                                                <span className="px-4 city-name" tabIndex={0} onKeyDown={(key) => { props.setDeliveryСity(key, elem.city) }}>{elem.city}</span>
                                            </div>
                                        )
                                    }
                                })
                            }
                        </div>
                        <div className="pizzerias">
                            {
                                pizzerias.map((elem: any, index) => {
                                    if (index >= 6 && index < 12) {
                                        return (
                                            <div onClick={() => { props.setDeliveryСity(undefined, elem.city) }} className="city position-relative">

                                                {elem.letter ? <span className="first-letter position-absolute">{elem.letter}</span> : null}
                                                <span className="px-4 city-name" tabIndex={0} onKeyDown={(key) => { props.setDeliveryСity(key, elem.city) }}>{elem.city}</span>
                                            </div>
                                        )
                                    }
                                })
                            }
                        </div>
                        <div className="pizzerias pb-5">
                            {
                                pizzerias.map((elem: any, index) => {
                                    if (index >= 12 && index <= 18) {
                                        return (
                                            <div onClick={() => { props.setDeliveryСity(undefined, elem.city) }} className="city position-relative">
                                                {elem.letter ? <span className="first-letter position-absolute">{elem.letter}</span> : null}
                                                <span className="px-4 city-name" tabIndex={0} onKeyDown={(key) => { props.setDeliveryСity(key, elem.city) }}>
                                                    {elem.city}
                                                </span>
                                            </div>
                                        )
                                    }
                                })
                            }
                        </div>
                    </div>

                </Modal.Body>
            </Modal>
        </>
    )

}

export default ModalPizzerias;