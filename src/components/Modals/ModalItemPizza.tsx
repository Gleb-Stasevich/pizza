import { useSelector, useDispatch } from 'react-redux';
import { TypeAdditiveItem } from '../../types/types';
import { UpdateListOrders, UpdateAmountOrder, changeModalItem } from '../../actions/actions';
import { RootState } from '../../store/store';

import Modal from 'react-bootstrap/Modal';

import closeIngred from './assets/close.png'
import returnIngred from './assets/return.png';
import checkedIcon from './assets/checked-icon.png';

import './modalItem.scss';

type Props = {
    additives: TypeAdditiveItem[],
    modalItem: any,
    onHide: () => void,
    show: boolean,
    showAddedMessage: (show: string) => void
}

const ModalItemPizza = ({ additives, modalItem, onHide, show, showAddedMessage }: Props) => {

    let selectedSize = useSelector((state: RootState) => state.modalItem?.selectedSize);
    let selectedDough = useSelector((state: RootState) => state.modalItem?.selectedDough);
    let orders = useSelector((state: RootState) => state.orders);

    const dispatch = useDispatch();

    const removeIngred = (e: React.MouseEvent<HTMLButtonElement>) => {

        const parent = e.target as HTMLElement;
        const button = parent.closest('button');
        const img = button!.querySelector('img');
        if (button !== null && img !== null) {

            if (img.src === returnIngred) {
                img.src = closeIngred;
                button.classList.remove('return');
                button.classList.add('close');
                dispatch(changeModalItem(['addIngred', button.textContent]));
                return;
            }

            img.src = returnIngred;
            button.classList.remove('close');
            button.classList.add('return');
            dispatch(changeModalItem(['removeIngred', button.textContent]));
        }
    }

    const changeAdditives = (e: React.MouseEvent<HTMLButtonElement>) => {
        const parent = e.target as HTMLElement;
        const button = parent.closest('button');
        const buttonTitle = button!.querySelector('.additive__title')!.textContent;
        const buttonPrice = Number(button!.querySelector('.additive__price')!.textContent);

        if (button!.classList.contains('checked')) {
            button!.classList.remove('checked');
            button!.classList.add('no-checked');
            dispatch(changeModalItem(['removeAdditive', buttonTitle, buttonPrice]));

        } else {
            button!.classList.add('checked');
            button!.classList.remove('no-checked');
            dispatch(changeModalItem(['addAdditive', buttonTitle, buttonPrice]));
        }
    }

    const changeSize = (e: React.MouseEvent<HTMLLabelElement>) => {

        const label = e.target as HTMLLabelElement;
        const chooseItem = document.querySelector('.choose-sise') as HTMLDivElement;
        const chooseDough = document.querySelector('.choose-dough') as HTMLDivElement;
        const dough = document.querySelector<HTMLDivElement>('.container-dough')!.lastElementChild!.previousElementSibling!.nextElementSibling!.firstElementChild;

        if (label.textContent === 'Маленькая' && selectedDough === 'Традиционное') {
            dough!.classList.add('disable-small-size');
            chooseItem.style.left = '2px';

            if (selectedSize !== 'Маленькая') {
                dispatch(changeModalItem(['choosedSize', label.textContent]));
            }
            return;

        } else if (label.textContent === 'Маленькая' && selectedDough === 'Тонкое') {
            chooseDough.style.left = '2px';
            dough!.classList.add('disable-small-size');
        } else {
            dough!.classList.remove('disable-small-size');
        }
        const labels = chooseItem!.nextElementSibling!.querySelectorAll<HTMLLabelElement>('label');
        const arrLabels = Array.from(labels);

        let moveChooseItem: string = '';

        for (let elem of labels) {
            if (elem === label) {
                moveChooseItem = (arrLabels.indexOf(elem) + '02px');
            }
        }
        if (chooseItem !== null) {
            chooseItem.style.left = moveChooseItem;
        }
        dispatch(changeModalItem(['choosedSize', label.textContent]));
    }

    const changeDough = (e: React.MouseEvent<HTMLLabelElement>) => {

        const label = e.target as HTMLLabelElement;
        const dough = document.querySelector<HTMLDivElement>('.container-dough')!.lastElementChild!.previousElementSibling!.nextElementSibling!.firstElementChild;

        if (label.textContent === 'Тонкое' && dough!.classList.contains('disable-small-size')) {
            return;
        }

        const chooseItem = document.querySelector('.choose-dough') as HTMLDivElement;
        const labels = chooseItem!.nextElementSibling!.querySelectorAll<HTMLLabelElement>('label');
        const arrLabels = Array.from(labels);

        let moveChooseItem: string = '';

        for (let elem of labels) {
            if (elem === label) {
                if (arrLabels.indexOf(elem) === 0) {
                    moveChooseItem = '2px';
                } else {
                    moveChooseItem = '154px';
                }
            }
        }
        if (chooseItem !== null) {
            chooseItem.style.left = moveChooseItem;
        }
        dispatch(changeModalItem(['choosedDough', label.textContent]));
    }

    const addOrder = () => {
        showAddedMessage(modalItem.title);

        let id: number = Math.random();
        let modalItemJSON: string = JSON.stringify(modalItem);
        const regexpVolume: RegExp = /"volume":".+?г"/gi;
        const regexpAdditives: RegExp = /"selectedAdditives":.+?]/gi;

        for (let order of orders) {
            let orderJSON: string = JSON.stringify(order);

            const additivesModalItem: RegExpMatchArray | null = modalItemJSON.match(regexpAdditives);
            const volumeModalItem: RegExpMatchArray | null = modalItemJSON.match(regexpVolume);
            const additivesOrder: RegExpMatchArray | null = orderJSON.match(regexpAdditives);
            const volumeOrder: RegExpMatchArray | null = orderJSON.match(regexpVolume);

            if (volumeOrder !== null && volumeModalItem) {
                if (additivesModalItem !== null && additivesOrder !== null) {

                    if (additivesModalItem[0] === additivesOrder[0]) {
                        if (volumeOrder[0] === volumeModalItem[0]) {
                            dispatch(UpdateAmountOrder(orders.indexOf(order)));
                            return;
                        }
                    }
                }
            }
        }
        // если нет таких заказов в корзине:
        dispatch(UpdateListOrders(modalItem));
        dispatch(changeModalItem(['changeId', modalItem]));

    }

    return (
        <Modal
            onHide={() => onHide()}
            show={show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="media-modal-pizza"
        >
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
                <div className="modal-item">
                    <div className="modal-item__container media-modal-container-pizza d-flex justify-content-around align-items-center">
                        <div className="modal-item__img">
                            <img className="pt-3" src={modalItem?.img?.traditional?.big} alt={modalItem?.title} />
                        </div>
                        <div className="modal-item__choice">
                            <div className="choice-content">
                                <h4 className="pt-1">{modalItem?.title}</h4>
                                <div className="modal-item__volume text-muted">
                                    <span>{modalItem?.volume}</span>
                                </div>
                                <div className="modal-item__ingredients">
                                    {
                                        modalItem?.ingredients?.map((item: string) => {
                                            return (
                                                <button key={item} className="close" onClick={(e) => removeIngred(e)}>{item} <img src={closeIngred} alt="close" />, </button>
                                            )
                                        })
                                    }

                                    <div className="modal-item__inputs pt-3">
                                        {modalItem?.size?.length === 3 ? (
                                            <>
                                                <div className="slider choose-sise mt-3"></div>
                                                <div className="inputs-container d-flex">

                                                    {
                                                        modalItem?.size?.map((item: string) => {
                                                            return (
                                                                <div key={item}>
                                                                    <label key={item} onClick={(e) => changeSize(e)} htmlFor={item}>{item}</label>
                                                                    <input type="radio" name={item} id={item}></input>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                {modalItem?.size ? (
                                                    <>
                                                        <div className="slider choose-sise choose-one-size mt-3"></div>
                                                        <div className="inputs-container input-container-one-size"></div>
                                                        <label key={modalItem?.size[0]} htmlFor={modalItem?.size[0]}>{modalItem?.size[0]}</label>
                                                        <input type="radio" name={modalItem?.size[0]} id={modalItem?.size[0]}></input>
                                                    </>
                                                ) : null}
                                            </>
                                        )}
                                        {modalItem?.dough?.length === 2 ? (
                                            <>
                                                <div className="slider choose-dough"></div>
                                                <div className="inputs-container container-dough d-flex mt-2">
                                                    {
                                                        modalItem?.dough?.map((item: string) => {
                                                            return (
                                                                <div key={item}>
                                                                    <label key={item} onClick={(e) => changeDough(e)} htmlFor={item}>{item}</label>
                                                                    <input type="radio" name={item} id={item}></input>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                {modalItem?.dough ? (
                                                    <>
                                                        <div className="slider choose-dough choose-one-dough mt-3"></div>
                                                        <div className="inputs-container input-container-one-dough mt-2">
                                                            <label key={modalItem?.dough[0]} htmlFor={modalItem?.dough[0]}>{modalItem?.dough[0]}</label>
                                                            <input type="radio" name={modalItem?.dough[0]} id={modalItem?.dough[0]}></input>
                                                        </div>
                                                    </>
                                                ) : null}
                                            </>
                                        )
                                        }
                                    </div>

                                </div>

                                <div className="modal-items__additives">
                                    <span className="add-additive-txt">Добавить по вкусу</span>
                                    <div className="additives d-flex flex-wrap">
                                        {
                                            additives?.map((elem: TypeAdditiveItem) => {
                                                return (
                                                    <button key={elem.id} onClick={(e) => changeAdditives(e)} className="additive position-relative no-checked mx-1 mt-2">
                                                        <div className="additive__img">
                                                            <img src={elem.img} alt={elem.title} />
                                                            <img className="checked-icon position-absolute" src={checkedIcon} alt="active" />
                                                        </div>
                                                        <div className="additive__title">
                                                            <span>{elem.title}</span>
                                                        </div>
                                                        <div className="additive__price">
                                                            <span>{elem.price}</span>
                                                        </div>
                                                    </button>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="modal-item__buy media-buy-pizza pt-3">
                                <button onClick={() => addOrder()}>Добавить в корзину за {modalItem?.price.toFixed(2)}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default ModalItemPizza;