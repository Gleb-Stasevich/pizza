import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Col, Modal, Row } from "react-bootstrap";
import { useState } from "react";
import empty from './empty.png';
import closeIngred from '../../assets/icons/close.png';
import returnIngred from '../../assets/icons/return.png';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

import './modalHalfPizza.scss';
import { BlockList } from "net";
import { UpdateListOrders } from "../../actions/actions";

const ModalHalfPizza = (props: any) => {

    let pizzas = useSelector((state: RootState) => state.pizzas);
    let [choosedLeftHalf, setChoosedLeftHalf] = useState<null | any>(null);
    let [choosedRightHalf, setChoosedRightHalf] = useState<null | any>(null);
    let [choosedDough, setChoosedDough] = useState('Традиционное');

    const dispatch = useDispatch();

    const addHalf = (e: any, half: any) => {

        const currentElem = e.target.closest('.col-lg-4');
        let pizzasElems = document.querySelectorAll('.col-lg-4');

        if (currentElem.classList.contains('choosed-left')) {
            currentElem.classList.remove('choosed-left');
            setChoosedLeftHalf(null);
        } else if (currentElem.classList.contains('choosed-right')) {
            currentElem.classList.remove('choosed-right');
            setChoosedRightHalf(null);
        } else if (choosedLeftHalf && !choosedRightHalf) {
            currentElem.classList.add('choosed-right');
            setChoosedRightHalf(half);
        } else if (choosedRightHalf && !choosedLeftHalf) {
            currentElem.classList.add('choosed-left'); // циклом убрать?!
            setChoosedLeftHalf(half);
        } else if (choosedRightHalf && choosedLeftHalf) {
            for (let elem of pizzasElems) {
                if (elem.classList.contains('choosed-left')) {
                    elem.classList.remove('choosed-left');
                }
                if (elem.classList.contains('choosed-right')) {
                    elem.classList.remove('choosed-right');
                }
                setChoosedRightHalf(null);
            }
            currentElem.classList.add('choosed-left');
            setChoosedLeftHalf(half);
        } else {
            currentElem.classList.add('choosed-left');
            setChoosedLeftHalf(half);
        }
    }

    const removeIngred = (e: any) => {
        const button = e.target.closest('button');
        const img = button.querySelector('img');
        if (img.src === returnIngred) {
            img.src = closeIngred;
            button.classList.remove('return');
            button.classList.add('close');
            return;
        }
        img.src = returnIngred;
        button.classList.remove('close');
        button.classList.add('return');
    }

    const changeDough = (e: any) => {

        const label = e.target as HTMLLabelElement;
        const dough = document.querySelector<HTMLDivElement>('.half-dough')!.lastElementChild!.previousElementSibling;
        if (e.target.textContent === 'Тонкое' && dough!.classList.contains('disable-small-size')) {
            return;
        }

        const chooseItem = document.querySelector('.choose-dough-half') as HTMLDivElement;
        //@ts-ignore
        const labels = chooseItem.nextElementSibling.querySelectorAll('label');
        const arrLabels = Array.from(labels);

        let moveChooseItem = '';

        for (let elem of labels) {
            if (elem === label) {
                if (arrLabels.indexOf(elem) === 0) {
                    moveChooseItem = '2px';
                    setChoosedDough('Традиционное');
                } else {
                    moveChooseItem = '148px';
                    setChoosedDough('Тонкое');
                }
            }
        }
        if (chooseItem !== null) {
            chooseItem.style.left = moveChooseItem;
        }
    }

    const addPizza = () => {
        let ingredsButtons = document.querySelectorAll('.return');
        let ingreds = [];
        for (let ingred of ingredsButtons) {
            ingreds.push(ingred.textContent);
        }

        const newPizza = {
            id: Math.random(),
            halfPizza: true,
            title: choosedLeftHalf.title + ' + ' + choosedRightHalf.title,
            price: (choosedLeftHalf.price + choosedRightHalf.price).toFixed(2),
            img: {
                traditional: {
                    mediumLeft: choosedLeftHalf.img.traditional.medium,
                    mediumRight: choosedRightHalf.img.traditional.medium
                }
            },
            volume: choosedDough === 'Традиционное' ? choosedLeftHalf.volumes.traditional[2] : choosedLeftHalf.volumes.thin[1],
            selectedIngreds: ingreds,
            selectedDough: choosedDough,
            selectedSize: 'Большая',
            quantity: 1
        }

        ingreds = [];

        //@ts-ignore
        dispatch(UpdateListOrders(newPizza));
    }

    const needChoose = !choosedLeftHalf ? 'Выберите левую половинку' : !choosedRightHalf ? 'Выберите правую половинку' : null;

    return (
        <>
            <Modal className="modal-half-pizza"
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Body className="modal-body-half-pizza d-flex">
                    <div className="half-pizza__choose">
                        <div className="half-pizza__top-title pb-2">
                            <span>Выберите пиццы для левой<br /> и правой половинки</span>
                        </div>
                        <div className="half-pizza__pizzas d-flex flex-wrap">
                            <Row>
                                {pizzas.map((pizza: any, index: number) => {
                                    if (index === 0 || index === 1) {
                                        return null
                                    }
                                    return (
                                        <Col onClick={(e: any) => addHalf(e, pizza)} lg="4">
                                            <div className="half-pizza__block text-center mt-1 mb-1">
                                                <div className="half-pizza__img">
                                                    <img src={pizza.img.traditional.medium} />
                                                </div>
                                                <div className="half-pizza__title">
                                                    <span>{pizza.title}</span>
                                                </div>
                                                <div className="half-pizza__price">
                                                    <span>{pizza.price} руб.</span>
                                                </div>
                                            </div>
                                        </Col>
                                    )
                                })}
                            </Row>
                        </div>
                    </div>
                    <div className="half-pizza__add-half">
                        <div className="half-pizza-creator d-flex justify-content-center">
                            {choosedLeftHalf !== null && choosedRightHalf !== null ? (
                                <div className="d-flex justify-content-center">
                                    <div className="half-pizza__container">
                                        <img src={choosedLeftHalf.img.traditional.medium} alt="add pizza"></img>
                                    </div>
                                    <div className="half-pizza__container half-container-2 position-relative">
                                        <img className="position-absolute" src={choosedRightHalf.img.traditional.medium} alt="add pizza"></img>
                                    </div>
                                </div>
                            ) : choosedLeftHalf !== null ? (
                                <div className="half-pizza__container only-left-part">
                                    <img src={choosedLeftHalf.img.traditional.medium} alt="add pizza"></img>
                                    <img className="empty-pizza" src={empty} alt="add pizza"></img>
                                </div>
                            ) : choosedRightHalf !== null ? (
                                <div className="d-flex">
                                    <div className="half-pizza__container">
                                        <img className="empty-pizza" src={empty} alt="add pizza"></img>
                                    </div>
                                    <div className="half-pizza__container half-container-2 position-relative">
                                        <img className="position-absolute" src={choosedRightHalf.img.traditional.medium} alt="add pizza"></img>
                                    </div>
                                </div>
                            ) : (
                                <img className="empty-pizza no-half-pizza" src={empty} alt="add pizza"></img>
                            )}
                        </div>

                        <div className="half-pizza-choosed-left">
                            <div className="half-pizza-choosed-img">
                                {choosedLeftHalf !== null ? (
                                    <div className="half-pizza__left d-flex align-items-center">
                                        <div className="half-pizza__left-img">
                                            <img src={choosedLeftHalf.img.traditional.medium} alt="add pizza"></img>
                                        </div>
                                        <div className="half-pizza__choosed-description">
                                            <div className="half-pizza__choosed-title">
                                                <span>{choosedLeftHalf.title}</span>
                                            </div>
                                            <div className="half-pizza__choosed-ingreds modal-item__ingredients">
                                                {
                                                    choosedLeftHalf.ingredients.map((item: string) => {
                                                        return (
                                                            <button key={item} className="close" onClick={(e) => removeIngred(e)}>{item} <img src={closeIngred} alt="close" />, </button>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="empty-block d-flex align-items-center">
                                        <div className="empty-img px-2">
                                            <img src={empty} alt="add pizza"></img>
                                        </div>
                                        <div className="empty-tite px-2">
                                            <span>Выберите левую<br /> половинку</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="half-pizza-choosed-title">
                                <span></span>
                            </div>
                            <div className="half-pizza-choosed-ingredients">

                            </div>
                        </div>

                        <div className="half-pizza-choosed-right pt-2">
                            <div className="half-pizza-choosed-img">
                                {choosedRightHalf !== null ? (
                                    <div className="half-pizza__right d-flex align-items-center">
                                        <div className="half-pizza__right-img">
                                            <img src={choosedRightHalf.img.traditional.medium} alt="add pizza"></img>
                                        </div>
                                        <div className="half-pizza__choosed-description choosed-right-desc">
                                            <div className="half-pizza__choosed-title">
                                                <span>{choosedRightHalf.title}</span>
                                            </div>
                                            <div className="half-pizza__choosed-ingreds modal-item__ingredients">
                                                {
                                                    choosedRightHalf.ingredients.map((item: string) => {
                                                        return (
                                                            <button key={item} className="close" onClick={(e) => removeIngred(e)}>{item} <img src={closeIngred} alt="close" />, </button>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="empty-block d-flex align-items-center pt-1">
                                        <div className="empty-img px-2">
                                            <img src={empty} alt="add pizza"></img>
                                        </div>
                                        <div className="empty-tite px-2">
                                            <span>Выберите правую<br /> половинку</span>
                                        </div>
                                    </div>
                                )
                                }
                            </div>
                        </div>
                        <div className="modal-item__inputs pt-3">
                            <div className="slider choose-dough-half"></div>
                            <div className="inputs-container container-dough half-dough d-flex mt-2">
                                <label key="Традиционное" onClick={(e) => changeDough(e)} htmlFor="Традиционное">Традиционное</label>
                                <input type="radio" name="Традиционное" id="Традиционное"></input>
                                <label key="Тонкое" onClick={(e) => changeDough(e)} htmlFor="Тонкое">Тонкое</label>
                                <input type="radio" name="Тонкое" id="Тонкое"></input>
                            </div>
                        </div>
                        <div className="modal-item__buy buy-half pt-3">
                            {choosedLeftHalf !== null && choosedRightHalf !== null ?
                                (
                                    <button onClick={() => addPizza()}>Добавить в корзину за {(choosedLeftHalf?.price + choosedRightHalf?.price).toFixed(2)}</button>
                                )
                                : (
                                    <>
                                        <OverlayTrigger
                                            rootClose={true}
                                            trigger="click"
                                            placement="top"
                                            overlay={
                                                <Popover id={`popover-positioned-top`}>
                                                    <Popover.Body>
                                                        <span>{needChoose}</span>
                                                    </Popover.Body>
                                                </Popover>
                                            }
                                        >
                                            <button>Добавить в корзину</button>
                                        </OverlayTrigger>
                                    </>

                                )
                            }
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ModalHalfPizza;


/**
 * 
 *     width: 1000px;
    overflow-y: scroll;
    position: relative;
    height: 70vh;
 */
