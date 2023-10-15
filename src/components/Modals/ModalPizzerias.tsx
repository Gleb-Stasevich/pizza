import { useSelector } from "react-redux";

import { TypePizzerias } from "../../types/types";
import { RootState } from "../../store/store";
import { Modal } from "react-bootstrap";

import logo from '../../components/Content/assets/dodo-logo.png';

import './modalItemPizzerias.scss';

const ModalPizzerias = (props: any) => {

    const { onHide, show } = props;
    let pizzerias = useSelector((state: RootState) => state.pizzerias);
    return (
        <>
            <Modal className="modal-pizzerias"
                onHide={() => onHide()}
                show={show}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <div className="modal-pizzerias__header d-flex align-items-center mb-5">
                        <div className="modal-pizzerias__img">
                            <img src={logo} alt="logo" />
                        </div>
                        <div className="modal-pizzerias__citys">
                            <h1>945 пиццерий в {pizzerias.length} странах</h1>
                        </div>
                    </div>
                    <div className="modal-item__pizzerias d-flex">
                        <div className="pizzerias">
                            {
                                pizzerias.map((elem: TypePizzerias, index: number) => {
                                    if (index < 6) {
                                        return (
                                            <div key={elem.id} onClick={() => { props.setDeliveryСity(undefined, elem.city) }} className="city position-relative">
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
                                pizzerias.map((elem: TypePizzerias, index: number) => {
                                    if (index >= 6 && index < 12) {
                                        return (
                                            <div key={elem.id} onClick={() => { props.setDeliveryСity(undefined, elem.city) }} className="city position-relative">

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
                                pizzerias.map((elem: TypePizzerias, index: number) => {
                                    if (index >= 12 && index <= 18) {
                                        return (
                                            <div key={elem.id} onClick={() => { props.setDeliveryСity(undefined, elem.city) }} className="city position-relative">
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