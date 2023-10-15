import { useState, useRef } from "react";
import { useDispatch } from 'react-redux';

import ModalPizzerias from '../Modals/ModalPizzerias';
import { setDeliveryCity } from '../../actions/actions';

import logo from '../Content/assets/dodo-logo.png';
import star from './assets/star.png';
import './banner.scss';

const Banner = () => {
    return <><View /></>
}

const View = () => {

    let dispatch = useDispatch();

    const [showModalPizzerias, setShowModalPizzerias] = useState<boolean>(false);
    let deliveryCity = useRef<HTMLSpanElement>(null);

    const setDeliveryСity = (key: React.KeyboardEvent, city: string) => {

        if (deliveryCity.current && key === undefined) {
            deliveryCity.current!.textContent = city;
            setShowModalPizzerias(false);
            dispatch(setDeliveryCity(city));

        } else if (key.key === 'Enter') {
            deliveryCity.current!.textContent = city;
            setShowModalPizzerias(false);
            dispatch(setDeliveryCity(city));
        }
    }

    return (
        <>
            <div className="banner d-flex flex-wrap flex-sm-nowrap align-items-center">

                <div className="banner__logotype mt-2 mt-sm-0">
                    <a href="#home"><img src={logo} alt="Logotype" /></a>
                </div>
                <div className="delivery d-flex flex-wrap flex-sm-nowrap justify-content-start align-items-center m-5">
                    <div className="delivery__city">
                        <div>
                            <span className="delivery-span-fw">Доставка пиццы </span>
                            <span onClick={() => setShowModalPizzerias(true)} ref={deliveryCity} className="current_delivery">Брест</span>
                        </div>
                        <div className="delivery__rating position-relative">
                            <span>30 мин</span> · <span>4.85 </span>
                            <img className="star-icon position-absolute" src={star} alt="stars"></img>
                        </div>
                    </div>
                    <div className="delivery__calls mx-5">
                        <span className="delivery-span-fw">7576</span>
                        <br />
                        <span className="text-muted">Звонков по телефону</span>
                    </div>
                </div>
            </div>
            <ModalPizzerias show={showModalPizzerias}
                setDeliveryСity={(key: React.KeyboardEvent, city: string) => setDeliveryСity(key, city)}
                onHide={() => setShowModalPizzerias(false)} />
        </>
    )
}

export default Banner;