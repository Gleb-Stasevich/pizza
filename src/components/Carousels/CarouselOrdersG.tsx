import './carouselOrders.scss';

import julienne from '../../assets/storyCarousel/julienne.png';
import chief from '../../assets/storyCarousel/chief_small.png';
import carbonara from '../../assets/storyCarousel/carbonara_small.png';
import dodoMix from '../../assets/storyCarousel/dodo-mix_small.png';
import pepperoni from '../../assets/storyCarousel/pepperoni_small.png';
import pastaCarbonara from '../../assets/storyCarousel/pasta-carbonara_small.png';
import danwid from '../../assets/storyCarousel/danwid-chorizo​-bbq_small.png';
import pizzaz_2 from '../../assets/storyCarousel/pizzaz-2_small.png';
import nextSlide from '../../assets/carouselOrders/next-slide.png';

import { useEffect } from 'react';
import { TypeHoverTranslate, TypeSliderParams } from '../../types/types';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { openModalItemConstructor } from '../../actions/actions';
import { useState } from "react";
import { AnyArray } from 'immer/dist/internal';

const CarouselOrdersG = () => {

    const dispatch = useDispatch();

    let { pizzas } = useSelector((state: RootState) => state);

    let [sliderItems, setSliderItems] = useState<AnyArray>([]);

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
        const items = Array.from(document.querySelectorAll<Element>('.often-ordered-item'));
        setSliderItems(items);
    }


    const getSliderEvents = () => {
        const target = document.querySelector('.next-slide');
        const target2 = document.querySelector('.prev-slide');

        const f = (side: any) => {
            if (side === 'next') {
                if (document.querySelector('.next')) {
                    /* @ts-ignore */
                    document.querySelector('.next')!.style.opacity = 0.3;
                    if (target) {
                        /* @ts-ignore */
                        document.querySelector('.ofter-ordered').style.transform = `translate(${sliderHoverEffects.next}px)`;
                    }
                }
            } else if (side === 'prev') {
                if (document.querySelector('.prev')) {
                    /* @ts-ignore */
                    document.querySelector('.prev')!.style.opacity = 0.3;
                    if (target2) {
                        /* @ts-ignore */
                        document.querySelector('.ofter-ordered').style.transform = `translate(${sliderHoverEffects.next + 40}px)`;
                    }
                }
            }
        }
        const f2 = (side: any) => {
            if (side === 'next') {
                if (document.querySelector('.next')) {
                    /* @ts-ignore */
                    document.querySelector('.next')!.style.opacity = 0.5;
                    if (target) {
                        /* @ts-ignore */
                        document.querySelector('.ofter-ordered').style.transform = `translate(${sliderHoverEffects.nextDefault}px)`;
                    }
                }
            } else if (side === 'prev') {
                if (document.querySelector('.prev')) {
                    /* @ts-ignore */
                    document.querySelector('.prev')!.style.opacity = 0.5;
                    if (target) {
                        /* @ts-ignore */
                        document.querySelector('.ofter-ordered').style.transform = `translate(${sliderHoverEffects.nextDefault}px)`;
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


        const buttonNext = document.querySelector<HTMLElement>('.next-slide');
        const buttonPrev = document.querySelector<HTMLElement>('.prev-slide');

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

            setSliderParams((state: any) => ({
                ...state,
                counterNext: state.counterNext + 1,
                counterPrev: state.counterPrev === 0 ? state.counterPrev : state.counterPrev - 1,
                itemOpacityNext: sliderItems[state.itemOpacityIndexNext + 1],
                itemOpacityIndexNext: state.itemOpacityIndexNext + 1,
                itemOpacityPrev: sliderItems[state.itemOpacityIndexPrev + 1],
                itemOpacityIndexPrev: state.itemOpacityIndexPrev + 1
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
        setSliderHoverEffects((state: any) => ({
            ...state, next: state.next - 290, nextDefault: state.nextDefault - 290
        }));
        /* @ts-ignore */
        document.querySelector('.ofter-ordered').style.transform = `translate(${sliderHoverEffects.next - 270}px)`;

        if (sliderParams.counterNext === 2) { // убираем
            let counter = 0;
            for (let elem of sliderItems) {
                if (elem.classList.contains('next')) {
                    break;
                } else {
                    counter += 1;
                }
            }
            if (counter === sliderItems.length) {
                //@ts-ignore
                document.querySelector('.next-slide').style.cssText = 'display: none !important';
            }
            counter = 0;
        }

    }

    const prevSlide = () => {

        const buttonPrev = document.querySelector<HTMLElement>('.prev-slide');
        const buttonNext = document.querySelector<HTMLElement>('.next-slide');


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

            setSliderParams((state: any) => ({
                ...state,
                counterNext: state.counterNext === 0 ? state.counterNext : state.counterNext - 1,
                counterPrev: state.counterPrev + 1,
                itemOpacityNext: sliderItems[state.itemOpacityIndexNext - 1],
                itemOpacityIndexNext: state.itemOpacityIndexNext - 1,
                itemOpacityPrev: sliderItems[state.itemOpacityIndexPrev - 1],
                itemOpacityIndexPrev: state.itemOpacityIndexPrev - 1
            }))

            if (sliderParams.itemOpacityIndexPrev === 0) {
                return;
            }

            if (sliderItems[sliderParams.itemOpacityIndexPrev - 1].classList.contains('prev')) {
                console.log('bbbb');
                sliderItems[sliderParams.itemOpacityIndexPrev - 1].classList.remove('prev');
                sliderItems[sliderParams.itemOpacityIndexPrev - 1].style.opacity = '1';
                if (sliderItems[sliderParams.itemOpacityIndexPrev - 2]) {
                    console.log('bbbb');
                    sliderItems[sliderParams.itemOpacityIndexPrev - 2].classList.add('prev');
                    sliderItems[sliderParams.itemOpacityIndexPrev - 2].style.opacity = '0.5';
                }
                console.log('bbbb');
                sliderItems[sliderParams.itemOpacityIndexNext].classList.remove('next');
                sliderItems[sliderParams.itemOpacityIndexNext - 1].classList.add('next');
                sliderItems[sliderParams.itemOpacityIndexNext - 1].style.opacity = '0.5';
            } else {
                console.log('bbbb');
                sliderItems[sliderParams.itemOpacityIndexNext].classList.add('next');
                sliderItems[sliderParams.itemOpacityIndexNext].style.opacity = '0.5';
                sliderItems[sliderParams.itemOpacityIndexPrev].classList.remove('prev');
                sliderItems[sliderParams.itemOpacityIndexPrev].style.opacity = '1';
                sliderItems[sliderParams.itemOpacityIndexPrev - 1].classList.add('prev');
                sliderItems[sliderParams.itemOpacityIndexPrev - 1].style.opacity = '0.5';

            }

            if (sliderParams.itemOpacityIndexNext !== sliderItems.length - 1) {
                sliderItems[sliderParams.itemOpacityIndexNext + 1].classList.remove('next');
                console.log('bbbb');
            }
        }

        // iON - делает сначала опасити нект следующий элеменет
        // iOIN - увеличивает индекс опасити элеменет на следующтй
        // меняем класс некст у элем

        setSliderHoverEffects((state: any) => ({
            ...state, next: state.next + 290, nextDefault: state.nextDefault + 290
        }));
        /* @ts-ignore */
        document.querySelector('.ofter-ordered').style.transform = `translate(${sliderHoverEffects.next + 310}px)`;
    }

    return (
        <div className="carousel-orders mt-4">
            <span className="carousel-orders-txt fs-5">Часто заказывают</span>
            <View pizzas={pizzas} nextSLide={nextSLide} prevSlide={prevSlide} dispatch={dispatch} getSliderEvents={getSliderEvents} />
        </div>
    )
}

const View = ({ pizzas, nextSLide, prevSlide, dispatch, getSliderEvents }: any) => {

    const openModalPizza = (e: any) => {
        const currentItem = e.target.closest('.often-ordered-item').querySelector('.often-ordered-name').textContent;
        const item = pizzas.find((elem: any) => elem.title === currentItem);
        dispatch(openModalItemConstructor(item));
    }

    return (
        <div className="wrapper position-relative">
            <div onMouseEnter={() => getSliderEvents().f('prev')}
                onMouseLeave={() => getSliderEvents().f2('prev')}
                onClick={(e) => prevSlide(e)}
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
                onClick={(e) => nextSLide()}
                className="next-slide position-absolute d-flex justify-content-center align-items-center">
                <img className="next-slide-icon" src={nextSlide} alt="next-slide" />
            </div>
        </div>
    )
}

export default CarouselOrdersG;