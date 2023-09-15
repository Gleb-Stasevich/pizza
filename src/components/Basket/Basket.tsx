import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import empty from './empty.png';

import './basket.scss';
import { useSelector, useDispatch } from 'react-redux';
import { changeQuantity, changeShowCounter, removeOrder, UpdateListOrders } from '../../actions/actions';
import imgRemove from './removeOrder.png';
import imgSause from './sause-img.png'
import addCauses from './add-causes.png';
import addDodster from './dodster.png';

const Basket = () => {

    let ordersSum = 0;

    const orders = useSelector((state: any) => state.orders);
    const causes = useSelector((state: any) => state.causes);

    console.log(causes);

    const [show, setShow] = useState(false);
    const [showSauces, setShowSauces] = useState(false);

    const dispatch = useDispatch();

    const handleClose = () => {
        setShow(false);
        document.querySelector('html')!.style.overflowY = 'auto';
    }

    const handleCloseSauces = () => {
        setShowSauces(false);
        document.querySelector<HTMLDivElement>('.canvas')!.classList.remove('dark-orders');
        for (let order of document.querySelectorAll('.order')) {
            order.classList.remove('dark-orders');
        }
        document.querySelector<HTMLDivElement>('.order')!.classList.remove('dark-orders');
        document.querySelector<HTMLDivElement>('.additive-order-block')!.classList.remove('dark-orders');
        document.querySelector<HTMLDivElement>('.img-add-causes')!.classList.remove('dark-orders-img');
        document.querySelector<HTMLDivElement>('.order__img')?.classList.remove('dark-orders-img');
        document.querySelector<HTMLDivElement>('.order__counter')?.classList.remove('dark-orders-img');
    }

    const handleShow = (button: any) => {
        setShow(true);
        document.querySelector('html')!.style.overflowY = 'hidden';
    }
    const handleShowSauces = (button: any) => {
        document.querySelector<HTMLDivElement>('.canvas')!.classList.add('dark-orders');
        for (let order of document.querySelectorAll('.order')) {
            order.classList.add('dark-orders');
        }
        document.querySelector<HTMLDivElement>('.additive-order-block')!.classList.add('dark-orders');
        document.querySelector<HTMLDivElement>('.img-add-causes')!.classList.add('dark-orders-img');
        document.querySelector<HTMLDivElement>('.order__img')?.classList.add('dark-orders-img');
        document.querySelector<HTMLDivElement>('.order__counter')?.classList.add('dark-orders-img');
        setShowSauces(true);
        // #929294
    }

    const changeQuantityItem = (e: React.MouseEvent<HTMLDivElement>, currentOrder: any) => {

        const signElem = e.target;
        const findOrderIndex = orders.findIndex((order: any) => order.id === currentOrder.id);
        const findCauseIndex = causes.findIndex((order: any) => order.id === currentOrder.id);

        console.log(orders[1], currentOrder);

        //@ts-ignore
        if (signElem.classList.contains('plus')) {
            //@ts-ignore
            if (signElem.parentElement.classList.contains('counter-cause')) {
                //@ts-ignore
                dispatch(changeQuantity({ findOrderIndex, 'sign': 'plus', isCause: true, findCauseIndex }));
                return;
            }
            //@ts-ignore
            dispatch(changeQuantity({ findOrderIndex, 'sign': 'plus', isCause: false }));
        } else {
            if (orders[findOrderIndex].quantity === 1) {
                dispatch(removeOrder(orders[findOrderIndex]));
                return;
            }
            //@ts-ignore
            if (signElem.parentElement.classList.contains('counter-cause')) {
                //@ts-ignore
                dispatch(changeQuantity({ findOrderIndex, 'sign': 'minus', isCause: true, findCauseIndex }));
                return;
            }
            //@ts-ignore
            dispatch(changeQuantity({ findOrderIndex, 'sign': 'minus' }));
        }
    }

    const addOrderDodster = () => {
        //@ts-ignore
        dispatch(UpdateListOrders({
            id: Math.random(),
            title: "Додстер",
            price: 6.99,
            img: "snacks/dodster.png",
            volume: "1 шт",
            quantity: 1
        }))
        document.querySelector<HTMLDivElement>('.additive-dodster')!.style.cssText = 'display:none !important';
    }

    const addOrderCause = async (e: any, cause: any) => {
        await dispatch(changeShowCounter(causes.indexOf(cause)));
    }

    let getSum = 0;

    orders.map((order: any) => {
        getSum += order.price * order.quantity;
    });
    ordersSum = getSum;
    getSum = 0;


    return (
        <>
            <a onClick={(e: any) => handleShow(e)} className="header__basket" href="#basket">Корзина</a>
            <Offcanvas className="canvas" show={show} onHide={handleClose} placement="end" scroll={false}>
                {(orders.length === 0) ?
                    (
                        <Offcanvas.Body className="d-flex flex-column justify-content-center align-items-center">
                            <img src={empty} alt="empty" />
                            <div className="offcanvas__title pt-3">
                                <span>Ой, пусто!</span>
                            </div>
                            <div className="offcanvas__sub-title pt-3">
                                <span>Ваша корзина пуста, откройте «Меню»<br />
                                    и выберите понравившийся товар.<br />
                                    Мы доставим ваш заказ от 14,90 руб.</span>
                            </div>
                        </Offcanvas.Body>
                    ) : (
                        <Offcanvas.Body className="orders-list">
                            <div className="offcanvas__title pt-3 px-3">
                                <span>{orders.length}
                                    {
                                        (orders.length === 1) ? ' товар '
                                            : (orders.length > 1 && orders.length < 5) ? ' товара '
                                                : ' товаров '
                                    }
                                    на сумму {(ordersSum).toFixed(2)}

                                </span>
                            </div>
                            {orders.map((order: any) => {
                                return (
                                    <>
                                        <div className="order pt-2 mt-2 mb-2 position-relative">
                                            <img onClick={() => dispatch(removeOrder(order))} className="position-absolute remove-order-img" src={imgRemove} alt="order" />
                                            <div className="order__top-info d-flex px-3">
                                                <div className="order__img">
                                                    {
                                                        (order.halfPizza) ?
                                                            <div className="d-flex justify-content-center">
                                                                <div className="half-pizza__container order-half-container-1">
                                                                    <img className="order-half-img" src={order.img.traditional.mediumLeft} alt="add pizza"></img>
                                                                </div>
                                                                <div className="half-pizza__container half-container-2 order-half-container-2 position-relative">
                                                                    <img className="position-absolute order-half-img" src={order.img.traditional.mediumRight} alt="add pizza"></img>
                                                                </div>
                                                            </div>
                                                            :
                                                            (typeof (order.img) === 'object') ? <img src={order.img.traditional.medium} alt="order title" />
                                                                : <img src={order.img} alt="order title" />
                                                    }
                                                </div>
                                                <div className="order__name px-2">
                                                    <span className="order__title">{order.title}</span>
                                                    <br />
                                                    <span className="order__sub-title">{order.volume}</span>
                                                </div>

                                            </div>
                                            <hr className="mt-3" />
                                            <div className="order-bottom-counter d-flex justify-content-between pb-3 pt-3">
                                                <div className="order__price px-3 pt-1">
                                                    {(order.price * order.quantity).toFixed(2)} руб.
                                                </div>
                                                <div className="order__counter px-3">
                                                    <div className="counter d-flex px-3">
                                                        <div onClick={(e: React.MouseEvent<HTMLDivElement>) => changeQuantityItem(e, order)} className="counter__remove minus">&#8212;</div>
                                                        <span className="counter__amount">{order.quantity}</span>
                                                        <div onClick={(e: React.MouseEvent<HTMLDivElement>) => changeQuantityItem(e, order)} className="counter__add plus">+</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )
                            })}
                            <div className="orders__additives">
                                <div className="orders__additives_title pt-3 px-3">
                                    <span>Добавить к заказу?</span>
                                </div>
                                <div className="orders__additives-container d-flex pt-3 px-3">
                                    <div onClick={handleShowSauces} className="additive-order-block pb-3">
                                        <div className="additive-order-img">
                                            <img className="img-add-causes" src={addCauses} alt="add causes" />
                                        </div>
                                        <div className="additive-order-title">
                                            <span>Соусы</span>
                                        </div>
                                    </div>

                                    <div onClick={addOrderDodster} className="additive-order-block additive-dodster d-flex align-items-center mx-3">
                                        <div className="additive-order-img px-1">
                                            <img src={addDodster} alt="add dodster" />
                                        </div>
                                        <div className="additive-order-title">
                                            <span>Додстер</span>
                                            <br />
                                            <span className="additive-order-price px-2">6.99 руб.</span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <Offcanvas className="show-sauces" show={showSauces} onHide={handleCloseSauces} placement="bottom">
                                <Offcanvas.Body>
                                    <span className="causes__title">Соусы к бортикам и закускам</span>
                                    <div className="causes__container">
                                        {causes.map((cause: any) => {
                                            return (
                                                <div className="cause d-flex justify-content-between align-items-center">
                                                    <div className="cause__img">
                                                        <img src={cause.img} alt="sause"></img>
                                                        <span className="cause__title px-2">{cause.title}</span>
                                                    </div>
                                                    <div className="order__counter px-3">
                                                        {cause.showCounter === true ?
                                                            (
                                                                <div className="counter counter-cause d-flex px-3">
                                                                    <div onClick={(e: React.MouseEvent<HTMLDivElement>) => changeQuantityItem(e, cause)} className="counter__remove minus">&#8212;</div>
                                                                    <span className="counter__amount">{cause.quantity}</span>
                                                                    <div onClick={(e: React.MouseEvent<HTMLDivElement>) => changeQuantityItem(e, cause)} className="counter__add plus">+</div>
                                                                </div>
                                                            )
                                                            : (
                                                                <div onClick={(e: any) => addOrderCause(e, cause)} className="add-cause">
                                                                    <span>{cause.price} руб.</span>
                                                                </div>
                                                            )}
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </Offcanvas.Body>
                            </Offcanvas>
                        </Offcanvas.Body>
                    )}
            </Offcanvas>
        </>
    )
}

export default Basket;