import Pizzas from "./Pizzas";
import { useCallback, useEffect, useState } from "react";
import './catalog.scss';
import { useSelector, useDispatch } from "react-redux";
import { useHttp } from "../../hooks/htpp.hook";
import { dataFetching, dataFetched, dataFetcingError, openModalItemConstructor, openModalItemAdditiveConstructor, closeModalItemConstructor } from "../../actions/actions";
import { TypeCatalogItem } from "../../types/types";
import { RootState } from "../../store/store";
import Snacks from "./Snacks";
import Beverages from "./Beverages";
import ModalItemPizza from "../Modals/ModalItemPizza";
import Button from 'react-bootstrap/Button';
import ModalItemAdditives from "../Modals/ModalItemAdditives";
import ModalHalfPizza from "../Modals/ModalHalfPizza";

const Catalog = () => {


    let { pizzas, snacks, beverages, additives, modalItem, openModalPizza } = useSelector((state: RootState) => state);
    const [showModalAdditives, setShowModalAdditives] = useState(false);
    const [showModalHalfPizza, setShowModalHalfPizza] = useState(false);
    const dispatch = useDispatch();
    const { request } = useHttp();

    useEffect(() => {
        getDataCatalog();
    }, []);

    const getDataCatalog = useCallback(async () => {
        dispatch(dataFetching());
        await request('http://localhost:3001/data').then(result => dispatch(dataFetched(result)))
            .catch(e => dispatch(dataFetcingError(e)));
    }, []);

    const showModalConstructor = (item: any) => {
        dispatch(openModalItemConstructor(item));
    }

    const showModalForAdditives = (item: any) => {
        dispatch(openModalItemAdditiveConstructor(item));
        setShowModalAdditives(true);
    }

    const showModaForlHalfPizza = () => {
        setShowModalHalfPizza(true);
    }

    return (
        <>
            <Pizzas pizzas={pizzas} showModalConstructor={(item: any) => showModalConstructor(item)} showModaForlHalfPizza={showModaForlHalfPizza} />
            <Snacks snacks={snacks} showModalForAdditives={(item: any) => showModalForAdditives(item)} />
            <Beverages beverages={beverages} showModalForAdditives={(item: any) => showModalForAdditives(item)} />

            <ModalItemPizza
                additives={additives}
                modalItem={modalItem}
                show={openModalPizza}
                onHide={() => dispatch(closeModalItemConstructor())} />
            <ModalItemAdditives
                modalItem={modalItem}
                show={showModalAdditives}
                onHide={() => setShowModalAdditives(false)} />
            <ModalHalfPizza show={showModalHalfPizza}
                onHide={() => setShowModalHalfPizza(false)} />
        </>
    )
}

export default Catalog;