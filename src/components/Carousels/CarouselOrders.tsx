import { TypeHoverTranslate, TypePizzaItem, TypeSliderParams } from '../../types/types';
import { openModalItemConstructor } from '../../actions/actions';

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';

import julienne from './assetsOrders/julienne.png';
import chief from './assetsOrders/chief_small.png';
import carbonara from './assetsOrders/carbonara_small.png';
import dodoMix from './assetsOrders/dodo-mix_small.png';
import pepperoni from './assetsOrders/pepperoni_small.png';
import nextSlide from './assetsOrders/next-slide.png';

import './carouselOrders.scss';

const CarouselOrders = () => {

    const dispatch = useDispatch();

    let pizzas = useSelector((state: RootState) => state.pizzas);

    let [sliderItems, setSliderItems] = useState<HTMLDivElement[]>([]);

    let [sliderParams, setSliderParams] = useState<TypeSliderParams>({
        itemOpacityNext: null,
        itemOpacityPrev: null,
        itemOpacityIndexNext: 4,
        itemOpacityIndexPrev: 0,
        position: -290,
        counterNext: 0,
        counterPrev: 0,
        maxCountNext: 3,
        maxCountPrev: 3
    });

    let [sliderHoverEffects, setSliderHoverEffects] = useState<TypeHoverTranslate>({
        next: -20,
        nextDefault: 0
    });

    useEffect(() => {
        getSliderItems();
    }, []);


    const getSliderItems = async () => {
        const items = Array.from(document.querySelectorAll<HTMLDivElement>('.often-ordered-item'));
        setSliderItems(items);
    }


    const getSliderEvents = () => {
        const target = document.querySelector('.next-slide');
        const target2 = document.querySelector('.prev-slide');

        // Event - для добавления addEventListener (слушателей событий mouseover + mouseout)
        const f = (side: string | Event) => {
            if (side === 'next') {
                if (document.querySelector('.next')) {
                    document.querySelector<HTMLDivElement>('.next')!.style.opacity = '0.3';
                    if (target) {
                        document.querySelector<HTMLDivElement>('.ofter-ordered')!.style.transform = `translate(${sliderHoverEffects.next}px)`;
                    }
                }
            } else if (side === 'prev') {
                if (document.querySelector('.prev')) {
                    document.querySelector<HTMLDivElement>('.prev')!.style.opacity = '0.3';
                    if (target2) {
                        document.querySelector<HTMLDivElement>('.ofter-ordered')!.style.transform = `translate(${sliderHoverEffects.next + 40}px)`;
                    }
                }
            }
        }
        const f2 = (side: string | Event) => {
            if (side === 'next') {
                if (document.querySelector('.next')) {
                    document.querySelector<HTMLDivElement>('.next')!.style.opacity = '0.5';
                    if (target) {
                        document.querySelector<HTMLDivElement>('.ofter-ordered')!.style.transform = `translate(${sliderHoverEffects.nextDefault}px)`;
                    }
                }
            } else if (side === 'prev') {
                if (document.querySelector('.prev')) {
                    document.querySelector<HTMLDivElement>('.prev')!.style.opacity = '0.5';
                    if (target) {
                        document.querySelector<HTMLDivElement>('.ofter-ordered')!.style.transform = `translate(${sliderHoverEffects.nextDefault}px)`;
                    }
                }
            }
        }

        const addDefaultEvents = () => {
            target?.addEventListener('mouseover', f);
            target?.addEventListener('mouseout', f2);
        }

        return { addDefaultEvents, f, f2 }
    }

    const nextSLide = () => {


        const buttonNext = document.querySelector<HTMLDivElement>('.next-slide');
        const buttonPrev = document.querySelector<HTMLDivElement>('.prev-slide');

        if (sliderParams.counterNext >= sliderParams.maxCountNext) {
            buttonNext!.style.cssText = 'display:none !important';

            sliderItems[sliderParams.itemOpacityIndexNext].classList.remove('next');
            sliderItems[sliderParams.itemOpacityIndexPrev].classList.add('prev');
            sliderItems[sliderParams.itemOpacityIndexPrev].style.opacity = '0.5';
            sliderItems[sliderParams.itemOpacityIndexPrev - 1].classList.remove('prev');
            sliderItems[sliderParams.itemOpacityIndexPrev - 1].style.opacity = '1';
            sliderItems[sliderItems.length - 1].style.opacity = '1';
        } else {
            buttonNext!.style.cssText = 'display:flex !important';
            buttonPrev!.style.cssText = 'display:flex !important';

            setSliderParams((params: TypeSliderParams) => ({
                ...params,
                counterNext: params.counterNext + 1,
                counterPrev: params.counterPrev === 0 ? params.counterPrev : params.counterPrev - 1,
                itemOpacityNext: sliderItems[params.itemOpacityIndexNext + 1],
                itemOpacityIndexNext: params.itemOpacityIndexNext + 1,
                itemOpacityPrev: sliderItems[params.itemOpacityIndexPrev + 1],
                itemOpacityIndexPrev: params.itemOpacityIndexPrev + 1
            }))

            if (sliderParams.itemOpacityIndexNext === sliderItems.length - 1) {
                return;
            }
            if (sliderItems[sliderParams.itemOpacityIndexNext + 1].classList.contains('next')) {
                sliderItems[sliderParams.itemOpacityIndexNext + 1].classList.remove('next');
                if (sliderItems[sliderParams.itemOpacityIndexNext + 2]) {
                    sliderItems[sliderParams.itemOpacityIndexNext + 2].classList.add('next');
                }
                sliderItems[sliderParams.itemOpacityIndexNext + 1].style.opacity = '1';
                sliderItems[sliderParams.itemOpacityIndexPrev].classList.remove('prev');
                sliderItems[sliderParams.itemOpacityIndexPrev + 1].classList.add('prev');
                sliderItems[sliderParams.itemOpacityIndexPrev + 1].style.opacity = '1';
            } else {
                sliderItems[sliderParams.itemOpacityIndexNext + 1].classList.add('next');
                sliderItems[sliderParams.itemOpacityIndexPrev].classList.add('prev');
                sliderItems[sliderParams.itemOpacityIndexPrev].style.opacity = '0.5';
                sliderItems[sliderParams.itemOpacityIndexNext].style.opacity = '1';
                sliderItems[sliderParams.itemOpacityIndexNext].classList.remove('next');
            }
            if (sliderParams.itemOpacityIndexPrev !== 0) {
                sliderItems[sliderParams.itemOpacityIndexPrev - 1].classList.remove('prev');
            }
        }
        setSliderHoverEffects((effects: TypeHoverTranslate) => ({
            ...effects, next: effects.next - 290, nextDefault: effects.nextDefault - 290
        }));

        document.querySelector<HTMLDivElement>('.ofter-ordered')!.style.transform = `translate(${sliderHoverEffects.next - 270}px)`;

        if (sliderParams.counterNext === 2) { // скрываем кнопку если пришли до конца
            let counter = 0;
            for (let elem of sliderItems) {
                if (elem.classList.contains('next')) {
                    break;
                } else {
                    counter += 1;
                }
            }
            if (counter === sliderItems.length) {
                document.querySelector<HTMLDivElement>('.next-slide')!.style.cssText = 'display: none !important';
            }
            counter = 0;
        }

    }

    const prevSlide = () => {

        const buttonPrev = document.querySelector<HTMLDivElement>('.prev-slide');
        const buttonNext = document.querySelector<HTMLDivElement>('.next-slide');


        if (sliderParams.counterPrev === sliderParams.maxCountPrev) {
            buttonPrev!.style.cssText = 'display:none !important';
            sliderItems[sliderParams.itemOpacityIndexPrev].classList.remove('prev');
            sliderItems[sliderParams.itemOpacityIndexPrev].style.opacity = '1';
            sliderItems[sliderParams.itemOpacityIndexNext + 1].classList.remove('next');
            sliderItems[sliderParams.itemOpacityIndexNext].classList.add('next');
            sliderItems[sliderParams.itemOpacityIndexNext].style.opacity = '0.5';
        } else {
            if (sliderItems[0].classList.contains('prev')) {
                buttonPrev!.style.cssText = 'display:none !important';
            } else {
                buttonPrev!.style.cssText = 'display:flex !important';
            }
            buttonNext!.style.cssText = 'display:flex !important';

            setSliderParams((params: TypeSliderParams) => ({
                ...params,
                counterNext: params.counterNext === 0 ? params.counterNext : params.counterNext - 1,
                counterPrev: params.counterPrev + 1,
                itemOpacityNext: sliderItems[params.itemOpacityIndexNext - 1],
                itemOpacityIndexNext: params.itemOpacityIndexNext - 1,
                itemOpacityPrev: sliderItems[params.itemOpacityIndexPrev - 1],
                itemOpacityIndexPrev: params.itemOpacityIndexPrev - 1
            }))

            if (sliderParams.itemOpacityIndexPrev === 0) {
                return;
            }

            if (sliderItems[sliderParams.itemOpacityIndexPrev - 1].classList.contains('prev')) {
                sliderItems[sliderParams.itemOpacityIndexPrev - 1].classList.remove('prev');
                sliderItems[sliderParams.itemOpacityIndexPrev - 1].style.opacity = '1';

                if (sliderItems[sliderParams.itemOpacityIndexPrev - 2]) {
                    sliderItems[sliderParams.itemOpacityIndexPrev - 2].classList.add('prev');
                    sliderItems[sliderParams.itemOpacityIndexPrev - 2].style.opacity = '0.5';
                }
                sliderItems[sliderParams.itemOpacityIndexNext].classList.remove('next');
                sliderItems[sliderParams.itemOpacityIndexNext - 1].classList.add('next');
                sliderItems[sliderParams.itemOpacityIndexNext - 1].style.opacity = '0.5';
            } else {
                sliderItems[sliderParams.itemOpacityIndexNext].classList.add('next');
                sliderItems[sliderParams.itemOpacityIndexNext].style.opacity = '0.5';
                sliderItems[sliderParams.itemOpacityIndexPrev].classList.remove('prev');
                sliderItems[sliderParams.itemOpacityIndexPrev].style.opacity = '1';
                sliderItems[sliderParams.itemOpacityIndexPrev - 1].classList.add('prev');
                sliderItems[sliderParams.itemOpacityIndexPrev - 1].style.opacity = '0.5';
            }

            if (sliderParams.itemOpacityIndexNext !== sliderItems.length - 1) {
                sliderItems[sliderParams.itemOpacityIndexNext + 1].classList.remove('next');
            }
        }

        // iON - делает сначала опасити нект следующий элеменет
        // iOIN - увеличивает индекс опасити элеменет на следующтй
        // меняем класс некст у элем

        setSliderHoverEffects((effects: TypeHoverTranslate) => ({
            ...effects, next: effects.next + 290, nextDefault: effects.nextDefault + 290
        }));
        document.querySelector<HTMLDivElement>('.ofter-ordered')!.style.transform = `translate(${sliderHoverEffects.next + 310}px)`;
    }

    return (
        <div className="carousel-orders mt-4">
            <span className="carousel-orders-txt fs-5">Часто заказывают</span>
            <View pizzas={pizzas} nextSLide={nextSLide} prevSlide={prevSlide} dispatch={dispatch} getSliderEvents={getSliderEvents} />
        </div>
    )
}

const View = ({ pizzas, nextSLide, prevSlide, dispatch, getSliderEvents }: any) => {

    const openModalPizza = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target instanceof HTMLElement) {
            const currentItem = e.target.closest('.often-ordered-item')!.querySelector('.often-ordered-name')!.textContent;
            const item = pizzas.find((elem: TypePizzaItem) => elem.title === currentItem);
            dispatch(openModalItemConstructor(item));
        }
    }

    return (
        <div className="wrapper position-relative">
            <div onMouseEnter={() => getSliderEvents().f('prev')}
                onMouseLeave={() => getSliderEvents().f2('prev')}
                onClick={() => prevSlide()}
                className="prev-slide position-absolute d-flex justify-content-center align-items-center">
                <img className="next-slide-icon" src={nextSlide} alt="next-slide" />
            </div>
            <div className="ofter-ordered d-flex mt-4 position-relative pt-1 pb-1">
                <div onClick={(e) => openModalPizza(e)} className="often-ordered-item d-flex px-4 align-items-center mx-3">
                    <div className="often-ordered-img">
                        <img src={julienne} alt="" />
                    </div>
                    <div className="often-ordered-description">
                        <span className="often-ordered-name">Пицца Жюльен</span>
                        <br />
                        <span className="often-ordered-price">от 20,99 руб.</span>
                    </div>
                </div>

                <div onClick={(e) => openModalPizza(e)} className="often-ordered-item d-flex px-4 align-items-center mx-3">
                    <div className="often-ordered-img">
                        <img src={chief} alt="" />
                    </div>
                    <div className="often-ordered-description">
                        <span className="often-ordered-name">Пицца от шефа</span>
                        <br />
                        <span className="often-ordered-price">от 22,99 руб.</span>
                    </div>
                </div>

                <div onClick={(e) => openModalPizza(e)} className="often-ordered-item d-flex px-4 align-items-center mx-3">
                    <div className="often-ordered-img">
                        <img src={carbonara} alt="" />
                    </div>
                    <div className="often-ordered-description">
                        <span className="often-ordered-name">Карбонара</span>
                        <br />
                        <span className="often-ordered-price">от 18,99 руб.</span>
                    </div>
                </div>

                <div onClick={(e) => openModalPizza(e)} className="often-ordered-item d-flex px-4 align-items-center mx-3">
                    <div className="often-ordered-img">
                        <img src={dodoMix} alt="" />
                    </div>
                    <div className="often-ordered-description">
                        <span className="often-ordered-name">Бургер-пицца</span>
                        <br />
                        <span className="often-ordered-price">от 18,99 руб.</span>
                    </div>
                </div>

                <div onClick={(e) => openModalPizza(e)} className="often-ordered-item next d-flex px-4 align-items-center mx-3">
                    <div className="often-ordered-img">
                        <img src={pepperoni} alt="" />
                    </div>
                    <div className="often-ordered-description">
                        <span className="often-ordered-name">Мясной Микс</span>
                        <br />
                        <span className="often-ordered-price">от 22,99 руб.</span>
                    </div>
                </div>

                <div onClick={(e) => openModalPizza(e)} className="often-ordered-item d-flex px-4 align-items-center mx-3">
                    <div className="often-ordered-img">
                        <img src={dodoMix} alt="" />
                    </div>
                    <div className="often-ordered-description">
                        <span className="often-ordered-name">Итальянский цыпленок</span>
                        <br />
                        <span className="often-ordered-price">от 20,99 руб.</span>
                    </div>
                </div>

                <div onClick={(e) => openModalPizza(e)} className="often-ordered-item d-flex px-4 align-items-center mx-3">
                    <div className="often-ordered-img">
                        <img src={dodoMix} alt="" />
                    </div>
                    <div className="often-ordered-description">
                        <span className="often-ordered-name">Пицца-сказка</span>
                        <br />
                        <span className="often-ordered-price">от 15,99 руб.</span>
                    </div>
                </div>

                <div onClick={(e) => openModalPizza(e)} className="often-ordered-item d-flex px-4 align-items-center mx-3">
                    <div className="often-ordered-img">
                        <img src={dodoMix} alt="" />
                    </div>
                    <div className="often-ordered-description">
                        <span className="often-ordered-name">Пицца Жюльен</span>
                        <br />
                        <span className="often-ordered-price">от 20,99 руб.</span>
                    </div>
                </div>
            </div>
            <div onMouseEnter={() => getSliderEvents().f('next')}
                onMouseLeave={() => getSliderEvents().f2('next')}
                onClick={() => nextSLide()}
                className="next-slide position-absolute d-flex justify-content-center align-items-center">
                <img className="next-slide-icon" src={nextSlide} alt="next-slide" />
            </div>
        </div>
    )
}

export default CarouselOrders;