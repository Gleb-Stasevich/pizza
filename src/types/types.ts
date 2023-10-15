export type TypeSliderParams = {
    itemOpacityNext: Element | null,
    itemOpacityPrev: Element | null,
    itemOpacityIndexNext: number,
    itemOpacityIndexPrev: number,
    position: number,
    counterNext: number,
    counterPrev: number,
    maxCountNext: number,
    maxCountPrev: number
}

export type TypePizzaItem = {
    id: number,
    title: string,
    description: string,
    price: number,
    img: {
        traditional: {
            medium: string,
            big: string
        }
    },
    volume: string | null,
    volumes?: {
        traditional: string[],
        thin: string[]
    },
    size?: string[],
    dough?: string[],
    ingredients?: string[],
    quantity?: number,
}

export type TypeHalfPizza = {
    id: number,
    halfPizza: boolean,
    title: string,
    price: number,
    img: {
        traditional: {
            mediumLeft: string,
            mediumRight: string
        }
    },
    volume: string,
    selectedIngreds: string[],
    selectedDough: string,
    selectedSize: string,
    quantity: number
}

export type TypeCatalogItem = {
    id: number,
    title: string,
    description: string,
    price: number,
    img: string,
    volume: string,
    quantity: number,
}

export type TypeAdditiveItem = {
    id: number,
    title: string,
    price: number,
    img: string
}

export type TypeCause = {
    id: number,
    title: string,
    price: number,
    img: string,
    showCounter: boolean,
    quantity: number
}

export type TypePizzerias = {
    id: number,
    city: string,
    letter?: string
}

export type addDodster = {
    id: number,
    title: string,
    price: number,
    img: string,
    volume: string,
    quantity: number
}

export type TypeOrder = TypePizzaItem | TypeHalfPizza | TypeCatalogItem | TypeCause | addDodster;

export type TypeReducerState = {
    pizzas: TypePizzaItem[],
    snacks: TypeCatalogItem[],
    beverages: TypeCatalogItem[],
    additives: TypeAdditiveItem[],
    causes: TypeCause[],
    pizzerias: TypePizzerias[],
    orders: any[],
    loadingStatus: string,
    modalItem: any,
    openModalPizza: boolean,
    deliveryCity: string,
    stories: any[]
}

export type TypeHoverTranslate = {
    next: number,
    nextDefault: number
}

export type TypeChangeQuantity = {
    sign: string,
    isCause?: boolean,
    findOrderIndex?: number,
    findCauseIndex?: number,
    changeCause?: TypeOrder
}