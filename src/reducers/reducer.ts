import { createReducer } from '@reduxjs/toolkit'
import { TypeReducerState } from '../types/types'

import {
    dataFetched,
    dataFetching,
    dataFetcingError,
    UpdateListOrders,
    openModalItemConstructor,
    openModalItemAdditiveConstructor,
    closeModalItemConstructor,
    setDeliveryCity,
    changeQuantity,
    removeOrder,
    changeShowCounter,
    changeModalItem
} from '../actions/actions';

const initialState: TypeReducerState = {
    pizzas: [],
    snacks: [],
    beverages: [],
    additives: [],
    causes: [],
    pizzerias: [],
    orders: [],
    loadingStatus: 'wait',
    modalItem: null,
    openModalPizza: false,
    deliveryCity: 'Брест'
}

const reducer = createReducer(initialState, (builder: any) => {
    builder.addCase(dataFetching, (state: TypeReducerState) => {
        state.loadingStatus = 'loading';
    })
        .addCase(dataFetched, (state: TypeReducerState, action: any) => {
            console.log(action);
            state.pizzas = action.payload.pizzas;
            state.snacks = action.payload.snacks;
            state.beverages = action.payload.beverages;
            state.additives = action.payload.additives;
            state.causes = action.payload.causes;
            state.pizzerias = action.payload.pizzerias;
            state.loadingStatus = 'success';
        })
        .addCase(dataFetcingError, (state: TypeReducerState) => {
            state.loadingStatus = 'error';
        })
        .addCase(openModalItemConstructor, (state: TypeReducerState, action: any) => {
            state.modalItem = {
                ...action.payload,
                selectedAdditives: [],
                selectedIngreds: [],
                selectedDough: 'Традиционное',
                selectedSize: 'Средняя'
            };
            state.openModalPizza = true;
        })
        .addCase(openModalItemAdditiveConstructor, (state: TypeReducerState, action: any) => {
            state.modalItem = action.payload;
        })
        .addCase(closeModalItemConstructor, (state: TypeReducerState, action: any) => {
            state.openModalPizza = false;
        })
        .addCase(setDeliveryCity, (state: TypeReducerState, action: any) => {
            state.deliveryCity = action.payload;
        })
        .addCase(UpdateListOrders, (state: TypeReducerState, action: any) => {
            state.orders.push(action.payload);
        })
        .addCase(changeQuantity, (state: TypeReducerState, action: any) => {
            if (action.payload.sign === 'plus') {
                state.orders[action.payload.findOrderIndex].quantity += 1;
                if (action.payload.isCause) {
                    state.causes[action.payload.findCauseIndex].quantity += 1;
                }
            } else {
                state.orders[action.payload.findOrderIndex].quantity -= 1;
            }
        })
        .addCase(removeOrder, (state: TypeReducerState, action: any) => {
            state.orders = state.orders.filter(order => order.id !== action.payload.id);
        })
        .addCase(changeShowCounter, (state: TypeReducerState, action: any) => {
            state.causes[action.payload].showCounter = true;
            state.orders.push(state.causes[action.payload]);
        })
        .addCase(changeModalItem, (state: TypeReducerState, action: any) => {
            let [change, value, buttonPrice] = action.payload;

            if (change === 'addAdditive') {
                state.modalItem.selectedAdditives.push(value);
                state.modalItem.price += buttonPrice;

            } else if (change === 'removeAdditive') {
                state.modalItem.selectedAdditives = state.modalItem.selectedAdditives.filter((additive: string) => additive !== value);
                state.modalItem.price -= buttonPrice;

            } else if (change === 'addIngred') {
                state.modalItem.selectedIngreds.push(value);

            } else if (change === 'removeIngred') {
                state.modalItem.selectedIngreds = state.modalItem.selectedIngreds.filter((ingred: string) => ingred !== value);

            } else if (change === 'choosedSize') {
                if (value === 'Маленькая' && state.modalItem.selectedSize === 'Средняя') {
                    state.modalItem.price -= 8;
                    state.modalItem.volume = state.modalItem.volumes.traditional[0];

                } else if (value === 'Средняя' && state.modalItem.selectedSize === 'Маленькая') {
                    state.modalItem.price += 8;
                    if (state.modalItem.selectedDough === 'Традиционное') {
                        state.modalItem.volume = state.modalItem.volumes.traditional[1];
                    } else {
                        state.modalItem.volume = state.modalItem.volumes.thin[0];
                    }

                } else if (value === 'Средняя' && state.modalItem.selectedSize === 'Большая') {
                    state.modalItem.price -= 5;
                    if (state.modalItem.selectedDough === 'Традиционное') {
                        state.modalItem.volume = state.modalItem.volumes.traditional[1];
                    } else {
                        state.modalItem.volume = state.modalItem.volumes.thin[0];
                    }

                } else if (value === 'Большая' && state.modalItem.selectedSize === 'Средняя') {
                    state.modalItem.price += 5;
                    if (state.modalItem.selectedDough === 'Традиционное') {
                        state.modalItem.volume = state.modalItem.volumes.traditional[2];
                    } else {
                        state.modalItem.volume = state.modalItem.volumes.thin[1];
                    }

                } else if (value === 'Маленькая' && state.modalItem.selectedSize === 'Большая') {
                    state.modalItem.price -= 13;
                    state.modalItem.volume = state.modalItem.volumes.traditional[0];

                } else if (value === 'Большая' && state.modalItem.selectedSize === 'Маленькая') {
                    state.modalItem.price += 13;
                    if (state.modalItem.selectedDough === 'Традиционное') {
                        state.modalItem.volume = state.modalItem.volumes.traditional[2];
                    } else {
                        state.modalItem.volume = state.modalItem.volumes.thin[1];
                    }
                }
                state.modalItem.selectedSize = value;

            } else if (change === 'choosedDough') {
                state.modalItem.selectedDough = value;
                if (value === 'Традиционное') {
                    if (state.modalItem.selectedSize === 'Средняя') {
                        state.modalItem.volume = state.modalItem.volumes.traditional[1];
                    } else if (state.modalItem.selectedSize === 'Большая') {
                        state.modalItem.volume = state.modalItem.volumes.traditional[2];
                    }
                } else if (value === 'Тонкое') {
                    if (state.modalItem.selectedSize === 'Средняя') {
                        state.modalItem.volume = state.modalItem.volumes.thin[0];
                    } else if (state.modalItem.selectedSize === 'Большая') {
                        state.modalItem.volume = state.modalItem.volumes.thin[1];
                    }
                }
            }
        })
        .addDefaultCase(() => { })
});

export default reducer;