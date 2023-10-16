import { TypeCatalogItem } from "../../types/types";

type Props = {
    beverages: TypeCatalogItem[],
    showModalForAdditives: (item: TypeCatalogItem) => void
}

const Beverages = ({ beverages, showModalForAdditives }: Props) => {

    const chooseItem = (item: TypeCatalogItem) => {
        showModalForAdditives(item);
    }


    return (
        <div className="beverages">
            <div className="catalog-title" id="beverages">Напитки</div>
            <div className="catalog-container d-flex flex-wrap justify-content-between align-items-center">

                {
                    beverages.map((item: TypeCatalogItem, index: number) => {
                        return (
                            <div
                                className="catalog-block mx-2"
                                style={(index <= 3) ? { marginBottom: '30px' } : { marginBottom: '0px' }}
                                onClick={() => chooseItem(item)}
                                key={item.id}
                            >
                                <div className="catalog-item-img">
                                    <img src={item.img} alt={item.title} />
                                </div>
                                <div style={(index >= 4) ? { height: 'auto' } : { height: '110px' }} className="catalog-item-info-beverages">
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

export default Beverages;