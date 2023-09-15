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

export type TypeCatalogItem = {
    id: number,
    title: string,
    description: string,
    price: number,
    img: string,
    volume: string | null
}

export type TypeAdditiveItem = {
    id: number,
    title: string,
    price: number,
    img: string
}

export type TypePizzerias = {
    id: number,
    city: string,
    letter?: string
}

export type TypeReducerState = {
    pizzas: TypeCatalogItem[],
    snacks: TypeCatalogItem[],
    beverages: TypeCatalogItem[],
    additives: TypeAdditiveItem[],
    causes: any[],
    pizzerias: TypePizzerias[],
    orders: any[],
    loadingStatus: string,
    modalItem: any,
    openModalPizza: boolean,
    deliveryCity: string
}

export type TypeHoverTranslate = {
    next: number,
    nextDefault: number
}