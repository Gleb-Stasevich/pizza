import { useSelector, useDispatch } from "react-redux";
import { UpdateListOrders, UpdateAmountOrder, changeModalItem } from "../../actions/actions";
import { RootState } from "../../store/store";

import { Modal } from "react-bootstrap";
import './modalItemAdditives.scss';

const ModalItemAdditives = (props: any) => {

    const { modalItem, onHide, show } = props;
    const orders = useSelector((state: RootState) => state.orders);

    const dispatch = useDispatch();

    const addOrder = () => {
        props.showAddedMessage(modalItem.title);

        const index: number = orders.findIndex(order => order.title === modalItem.title);
        if (index >= 0) {
            dispatch(UpdateAmountOrder(index));
        } else {
            dispatch(UpdateListOrders(modalItem));
            dispatch(changeModalItem(['changeId', modalItem]));
        }
    }
    return (
        <>
            <Modal className="modal-additives"
                onHide={() => onHide()}
                show={show}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body className="modal-body-additives">
                    <div className="modal-item__additives">
                        <div className="modal-item__additives-container d-flex justify-content-around">
                            <div className="modal-item__additives_img">
                                <img className="pt-3" src={modalItem?.img} alt={modalItem?.title} />
                            </div>
                            <div className="modal-item__additives-choice d-flex flex-column justify-content-between">
                                <div className="additives-content px-4">
                                    <h4 className="pt-4">{modalItem?.title}</h4>
                                    <div className="modal-item__additives-volume text-secondary">
                                        <span>{modalItem?.volume}</span>
                                    </div>
                                    <div className="modal-item__additives-description">
                                        <span>{modalItem?.description}</span>
                                    </div>
                                </div>
                                <div className="modal-item__buy media-buy-additives pt-3">
                                    <button onClick={() => addOrder()}>Добавить в корзину за {modalItem?.price}</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </Modal.Body>
            </Modal>
        </>
    )
}

export default ModalItemAdditives;