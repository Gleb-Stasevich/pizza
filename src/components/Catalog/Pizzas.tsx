import { TypePizzaItem } from "../../types/types";

type Props = {
    pizzas: TypePizzaItem[],
    showModaForlHalfPizza: () => void,
    showModalConstructor: (item: TypePizzaItem) => void
}

const Pizzas = ({ pizzas, showModaForlHalfPizza, showModalConstructor }: Props) => {

    const chooseItem = (item: TypePizzaItem) => {
        if (item.title === 'Пицца из половинок') {
            showModaForlHalfPizza();
        } else {
            showModalConstructor(item);
        }
    };

    return (
        <div className="pizzas">
            <div className="catalog-title" id="pizzas">Пицца</div>
            <div className="catalog-container d-flex flex-wrap justify-content-between align-items-center">

                {
                    pizzas.map((item: TypePizzaItem) => {
                        return (
                            <div onClick={() => chooseItem(item)} key={item.id} className="catalog-block mt-5 mx-2">
                                <div className="catalog-item-img">
                                    <img src={item.img?.traditional?.medium} alt={item.title} />
                                </div>
                                <div className="catalog-item-info">
                                    <div className="catalog-item-title">
                                        <span>{item.title}</span>
                                    </div>
                                    <div className="catalor-item-description pt-1">
                                        <div className="catalog-item-composition text-secondary">
                                            <span>{item.description}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="catalog-item-footer d-flex justify-content-between align-items-center pt-3">
                                    <div className="catalog-item-price">
                                        <span>от {item.price} руб.</span>
                                    </div>
                                    <div className="catalog-item-btn">
                                        <button>Выбрать</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }

            </div>
        </div>
    )
}

export default Pizzas;