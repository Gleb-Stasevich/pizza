import { createReducer, current } from '@reduxjs/toolkit'
import { TypePizzaItem, TypeReducerState } from '../types/types'

import {
    dataFetched,
    dataFetching,
    dataFetcingError,
    UpdateListOrders,
    UpdateAmountOrder,
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
    deliveryCity: 'Брест',
    stories: []
}

const reducer = createReducer(initialState, (builder: any) => {
    builder.addCase(dataFetching, (state: TypeReducerState) => {
        state.loadingStatus = 'loading';
    })
        .addCase(dataFetched, (state: TypeReducerState, action: any) => {
            state.pizzas = action.payload.pizzas;
            state.snacks = action.payload.snacks;
            state.beverages = action.payload.beverages;
            state.additives = action.payload.additives;
            state.causes = action.payload.causes;
            state.pizzerias = action.payload.pizzerias;
            state.loadingStatus = 'success';
            state.stories = action.payload.stories;
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
        .addCase(UpdateAmountOrder, (state: TypeReducerState, action: any) => {
            state.orders[action.payload].quantity += 1;
        })
        .addCase(changeQuantity, (state: TypeReducerState, action: any) => {
            if (action.payload.sign === 'plus') {
                state.orders[action.payload.findOrderIndex].quantity += 1;
                if (action.payload.isCause) {
                    state.causes[action.payload.findCauseIndex].quantity += 1;
                }
            } else {
                state.orders[action.payload.findOrderIndex].quantity -= 1;
                if (action.payload.isCause) {
                    state.causes[action.payload.findCauseIndex].quantity -= 1;
                }
            }
            if (action.payload.changeCause) {
                let index = state.causes.findIndex(cause => cause.title === action.payload.changeCause.title);
                if (action.payload.sign === 'plus') {
                    state.causes[index].quantity += 1;
                } else {
                    state.causes[index].quantity -= 1;
                }
            }
        })
        .addCase(removeOrder, (state: TypeReducerState, action: any) => {
            state.orders = state.orders.filter(order => order.id !== action.payload.id);
            if (action.payload.showCounter) {
                let index = state.causes.findIndex(cause => cause.title === action.payload.title);
                state.causes[index].showCounter = false;
            }
        })
        .addCase(changeShowCounter, (state: TypeReducerState, action: any) => {
            if (Array.isArray(action.payload)) {
                let index = state.causes.findIndex(cause => cause.title === action.payload[0].title);
                state.causes[index].showCounter = false;
            } else {
                state.causes[action.payload].showCounter = true;
                state.orders.push(state.causes[action.payload]);
            }
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
            } else if (change === 'changeId') {
                const index = state.orders.findIndex(elem => elem.id === action.payload[1].id);
                state.orders[index].id = Math.random();
            }
        })
        .addDefaultCase(() => { })
});

export default reducer;