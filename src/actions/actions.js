import { createAction } from "@reduxjs/toolkit";

export const dataFetching = createAction('DATA_FETCHING');
export const dataFetched = createAction('DATA_FETCHED');
export const dataFetcingError = createAction('DATA_FETCHING_ERROR');
export const openModalItemConstructor = createAction('OPEN_MODAL_ITEM');
export const closeModalItemConstructor = createAction('CLOSE_MODAL_ITEM');
export const setDeliveryCity = createAction('SET_DELIVERY_CITY');
export const openModalItemAdditiveConstructor = createAction('OPEN_MODAL_ITEM_ADDITIVE');
export const UpdateListOrders = createAction('UPDATE_LIST_ORDERS');
export const changeQuantity = createAction('CHANGE_QUANTITY')
export const removeOrder = createAction('REMOVE_ORDER');
export const changeShowCounter = createAction('CHANGE_SHOW_COUNTER');
export const changeModalItem = createAction('CHANGE_MODAL_ITEM');