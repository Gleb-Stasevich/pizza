import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";

import { TypeAdditiveItem, TypeCatalogItem, TypePizzaItem } from "../../types/types";
import {
    dataFetching,
    dataFetched,
    dataFetcingError,
    openModalItemConstructor,
    openModalItemAdditiveConstructor,
    closeModalItemConstructor
} from "../../actions/actions";


import { RootState } from "../../store/store";
import { useHttp } from "../../hooks/htpp.hook";
import { useAppDispatch } from "../../hooks/hooks";

import Pizzas from "./Pizzas";
import Snacks from "./Snacks";
import Beverages from "./Beverages";
import ModalItemPizza from "../Modals/ModalItemPizza";
import ModalItemAdditives from "../Modals/ModalItemAdditives";
import ModalHalfPizza from "../Modals/ModalHalfPizza";
import Toast from 'react-bootstrap/Toast';

import './catalog.scss';

const Catalog = () => {

    /** Дооставал каждую часть стейта чтобы не было предупреждения в консоли (при повторном рендере не доставался весь стейт) */
    let pizzas = useSelector((state: RootState) => state.pizzas);
    let snacks = useSelector((state: RootState) => state.snacks);
    let beverages = useSelector((state: RootState) => state.beverages);
    let additives = useSelector((state: RootState) => state.additives);
    let modalItem = useSelector((state: RootState) => state.modalItem);
    let openModalPizza = useSelector((state: RootState) => state.openModalPizza);

    const [showModalAdditives, setShowModalAdditives] = useState<boolean>(false);
    const [showModalHalfPizza, setShowModalHalfPizza] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const { request } = useHttp();

    const [show, setShow] = useState<boolean>(false);
    const [addedItem, setAddedItem] = useState<string>('');

    useEffect(() => {
        getDataCatalog();
    }, []);

    const getDataCatalog = useCallback(async () => {
        dispatch(dataFetching());

        const path = process.env.NODE_ENV === 'development'
            ? 'http://localhost:3001/data'
            : 'https://raw.githubusercontent.com/Gleb-Stasevich/pizza/master/catalog.json'

        await request(path).then(result => dispatch(dataFetched(result)))
            .catch(e => dispatch(dataFetcingError(e)));
    }, []);

    const showModalConstructor = (item: TypePizzaItem) => {
        dispatch(openModalItemConstructor(item));
        return;
    }

    const showModalForAdditives = (item: TypeAdditiveItem) => {
        dispatch(openModalItemAdditiveConstructor(item));
        setShowModalAdditives(true);
    }

    const showModaForlHalfPizza = () => {
        setShowModalHalfPizza(true);
    }

    const showAddedMessage = (show: string) => {
        setAddedItem(show);
        setShow(true);
    }

    return (
        <>
            <Pizzas pizzas={pizzas} showModalConstructor={(item: TypePizzaItem) => showModalConstructor(item)} showModaForlHalfPizza={showModaForlHalfPizza} />
            <Snacks snacks={snacks} showModalForAdditives={(item: TypeCatalogItem) => showModalForAdditives(item)} />
            <Beverages beverages={beverages} showModalForAdditives={(item: TypeCatalogItem) => showModalForAdditives(item)} />

            <ModalItemPizza
                additives={additives}
                modalItem={modalItem}
                show={openModalPizza}
                showAddedMessage={showAddedMessage}
                onHide={() => dispatch(closeModalItemConstructor())} />
            <ModalItemAdditives
                modalItem={modalItem}
                show={showModalAdditives}
                showAddedMessage={showAddedMessage}
                onHide={() => setShowModalAdditives(false)} />
            <ModalHalfPizza show={showModalHalfPizza}
                showAddedMessage={showAddedMessage}
                onHide={() => setShowModalHalfPizza(false)} />

            <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
                <Toast.Body>Добавлено:<br />{addedItem}</Toast.Body>
            </Toast>

        </>
    )
}

export default Catalog;