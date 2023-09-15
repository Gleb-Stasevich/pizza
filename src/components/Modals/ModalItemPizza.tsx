import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './modalItem.scss';
import closeIngred from '../../assets/icons/close.png';
import returnIngred from '../../assets/icons/return.png';
import checkedIcon from './checked-icon.png';
import { useEffect, useState } from 'react';
import { TypeAdditiveItem } from '../../types/types';
import { useDispatch, useSelector } from 'react-redux';
import { UpdateListOrders, changeModalItem } from '../../actions/actions';
import { RootState } from '../../store/store';

const ModalItemPizza = (props: any) => {

    const dispatch = useDispatch();

    const { modalItem, additives } = props;

    let selectedSize = useSelector((state: RootState) => state.modalItem?.selectedSize);
    let selectedDough = useSelector((state: RootState) => state.modalItem?.selectedDough);

    useEffect(() => {
        getAdditives();
    }, []);

    const getAdditives = async () => {
        try {
            const response = await fetch('http://localhost:3001/data/additives');
            const result = await response.json();
        } catch (e) {
            throw e;
        }

    }

    const removeIngred = (e: any) => {
        const button = e.target.closest('button');
        const img = button.querySelector('img');
        if (img.src === returnIngred) {
            img.src = closeIngred;
            button.classList.remove('return');
            button.classList.add('close');
            //@ts-ignore
            dispatch(changeModalItem(['addIngred', button.textContent]));
            return;
        }
        img.src = returnIngred;
        button.classList.remove('close');
        button.classList.add('return');
        //@ts-ignore
        dispatch(changeModalItem(['removeIngred', button.textContent]));
    }

    const changeAdditives = (e: any) => {
        const button = e.target.closest('button');
        const buttonTitle = button.querySelector('.additive__title').textContent;
        const buttonPrice = Number(button.querySelector('.additive__price').textContent);
        if (button.classList.contains('checked')) {
            button.classList.remove('checked');
            button.classList.add('no-checked');
            //@ts-ignore
            dispatch(changeModalItem(['removeAdditive', buttonTitle, buttonPrice]));
        } else {
            button.classList.add('checked');
            button.classList.remove('no-checked');
            //@ts-ignore
            dispatch(changeModalItem(['addAdditive', buttonTitle, buttonPrice]));
        }
    }

    const changeSize = (e: any) => {

        const label = e.target as HTMLLabelElement;
        const chooseItem = document.querySelector('.choose-sise') as HTMLDivElement;
        const chooseDough = document.querySelector('.choose-dough') as HTMLDivElement;
        const dough = document.querySelector<HTMLDivElement>('.container-dough')!.lastElementChild!.previousElementSibling;

        if (label.textContent === 'Маленькая' && selectedDough === 'Традиционное') {
            dough!.classList.add('disable-small-size');
            chooseItem.style.left = '2px';

            if (selectedSize !== 'Маленькая') {
                //@ts-ignore
                dispatch(changeModalItem(['choosedSize', label.textContent]));
            }
            return;
        } else if (label.textContent === 'Маленькая' && selectedDough === 'Тонкое') {
            chooseDough.style.left = '2px';
            dough!.classList.add('disable-small-size');
        } else {
            dough!.classList.remove('disable-small-size');
        }

        //@ts-ignore
        const labels = chooseItem.nextElementSibling.querySelectorAll('label');
        const arrLabels = Array.from(labels);

        let moveChooseItem = '';

        for (let elem of labels) {
            if (elem === label) {
                moveChooseItem = (arrLabels.indexOf(elem) + '02px');
            }
        }
        if (chooseItem !== null) {
            chooseItem.style.left = moveChooseItem;
        }
        //@ts-ignore
        dispatch(changeModalItem(['choosedSize', label.textContent]));
    }

    const changeDough = (e: any) => {

        const label = e.target as HTMLLabelElement;
        const dough = document.querySelector<HTMLDivElement>('.container-dough')!.lastElementChild!.previousElementSibling;
        if (e.target.textContent === 'Тонкое' && dough!.classList.contains('disable-small-size')) {
            return;
        }

        const chooseItem = document.querySelector('.choose-dough') as HTMLDivElement;
        //@ts-ignore
        const labels = chooseItem.nextElementSibling.querySelectorAll('label');
        const arrLabels = Array.from(labels);

        let moveChooseItem = '';

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
        //@ts-ignore
        dispatch(changeModalItem(['choosedDough', label.textContent]));
    }

    const addOrder = () => {
        dispatch(UpdateListOrders(modalItem));
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
                <div className="modal-item">
                    <div className="modal-item__container d-flex justify-content-around align-items-center">
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
                                        <div className="slider choose-sise mt-3"></div>
                                        <div className="inputs-container">
                                            {
                                                modalItem?.size?.map((item: string) => {
                                                    return (
                                                        <>
                                                            <label key={item} onClick={(e) => changeSize(e)} htmlFor={item}>{item}</label>
                                                            <input type="radio" name={item} id={item}></input>
                                                        </>
                                                    )
                                                })
                                            }
                                        </div>
                                        <div className="slider choose-dough"></div>
                                        <div className="inputs-container container-dough mt-2">
                                            {
                                                modalItem?.dough?.map((item: string) => {
                                                    return (
                                                        <>
                                                            <label key={item} onClick={(e) => changeDough(e)} htmlFor={item}>{item}</label>
                                                            <input type="radio" name={item} id={item}></input>
                                                        </>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>

                                </div>

                                <div className="modal-items__additives">
                                    <span className="add-additive-txt">Добавить по вкусу</span>
                                    <div className="additives d-flex flex-wrap">
                                        {
                                            additives?.map((elem: TypeAdditiveItem) => {
                                                return (
                                                    <button onClick={(e) => changeAdditives(e)} className="additive position-relative no-checked mx-1 mt-2">
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
                            <div className="modal-item__buy pt-3">
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