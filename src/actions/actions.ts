import { createAction } from "@reduxjs/toolkit";
import { TypeAdditiveItem, TypeChangeQuantity, TypeOrder, TypePizzaItem } from "../types/types";

export const dataFetching = createAction('DATA_FETCHING');
export const dataFetched = createAction('DATA_FETCHED');
export const dataFetcingError = createAction('DATA_FETCHING_ERROR');
export const closeModalItemConstructor = createAction('CLOSE_MODAL_ITEM');


export const openModalItemConstructor = createAction<TypePizzaItem>('OPEN_MODAL_ITEM');
export const openModalItemAdditiveConstructor = createAction<TypeAdditiveItem>('OPEN_MODAL_ITEM_ADDITIVE');
export const setDeliveryCity = createAction<string>('SET_DELIVERY_CITY');
export const removeOrder = createAction<number>('REMOVE_ORDER');
export const UpdateListOrders = createAction<TypeOrder>('UPDATE_LIST_ORDERS');
export const UpdateAmountOrder = createAction<number>('UPDATE_AMOUNT_ORDER');
export const changeQuantity = createAction<TypeChangeQuantity>('CHANGE_QUANTITY')
export const changeShowCounter = createAction<number | TypeOrder[]>('CHANGE_SHOW_COUNTER');
export const changeModalItem = createAction<(string | number | null | HTMLElement)[]>('CHANGE_MODAL_ITEM');