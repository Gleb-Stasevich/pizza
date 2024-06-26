import { TypeCatalogItem } from "../../types/types";

type Props = {
    snacks: TypeCatalogItem[],
    showModalForAdditives: (item: TypeCatalogItem) => void
}

const Snacks = ({ showModalForAdditives, snacks }: Props) => {

    const chooseItem = (item: TypeCatalogItem) => {
        showModalForAdditives(item);
    }

    return (
        <div className="snacks">
            <div className="catalog-title" id="snacks">Закуски</div>
            <div className="catalog-container d-flex flex-wrap justify-content-between align-items-center">

                {
                    snacks.map((item: TypeCatalogItem) => {
                        return (
                            <div onClick={() => chooseItem(item)} key={item.id} className="catalog-block mx-2 mt-5">
                                <div className="catalog-item-img">
                                    <img src={item.img} alt={item.title} />
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

export default Snacks;