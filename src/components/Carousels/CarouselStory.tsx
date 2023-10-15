import { useState } from 'react';
import Stories from '../Stories/Storis';
import Carousel from 'react-bootstrap/Carousel';

import img_1 from '../Carousels/assetsStories/story-carousel-1.png';
import img_2 from '../Carousels/assetsStories/story-carousel-2.png';
import img_3 from '../Carousels/assetsStories/story-carousel-3.png';
import img_4 from '../Carousels/assetsStories/story-carousel-4.png';
import img_5 from '../Carousels/assetsStories/story-carousel-5.png';
import img_6 from '../Carousels/assetsStories/story-carousel-6.png';
import img_7 from '../Carousels/assetsStories/story-carousel-7.png';
import img_8 from '../Carousels/assetsStories/story-carousel-8.png';
import img_9 from '../Carousels/assetsStories/story-carousel-9.png';

import './storyCarousel.scss';

const CarouselStory = () => {

    let [showModalStories, setShowModalStories] = useState<boolean>(false);
    let [indexStory, setIndexStory] = useState<number>(0);

    const openModalStory = (e: React.MouseEvent<HTMLDivElement>) => {
        const currentElem = e.target as HTMLElement;
        setIndexStory(Number(currentElem!.closest('div')!.getAttribute('id')));
        setShowModalStories(true);
    }

    return (
        <>
            <Carousel interval={null}>
                <Carousel.Item>
                    <div className="story d-flex flex-md-nowrap flex-wrap">
                        <div id="0" className="story-wrap position-relative mx-2 mt-2 mx-md-1 mx-lg-2" onClick={(e) => openModalStory(e)}>
                            <img className="story-img position-absolute" src={img_1} alt="" />
                        </div>
                        <div id="1" className="story-wrap position-relative mx-2 mt-2 mx-md-1 mx-lg-2" onClick={(e) => openModalStory(e)}>
                            <img className="story-img position-absolute" src={img_2} alt="" />
                        </div>
                        <div id="2" className="story-wrap position-relative mx-2 mt-2 mx-md-1 mx-lg-2" onClick={(e) => openModalStory(e)}>
                            <img className="story-img position-absolute" src={img_3} alt="" />
                        </div>
                        <div id="3" className="story-wrap position-relative mx-2 mt-2 mx-md-1 mx-lg-2" onClick={(e) => openModalStory(e)}>
                            <img className="story-img position-absolute" src={img_4} alt="" />
                        </div>
                        <div id="4" className="story-wrap position-relative mx-2 mt-2 mx-md-1 mx-lg-2" onClick={(e) => openModalStory(e)}>
                            <img className="story-img img_slice position-absolute" src={img_5} alt="" />
                            <div className="story_slice position-absolute"></div>
                        </div>
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className="story d-flex flex-md-nowrap flex-wrap">
                        <div id="5" className="story-wrap position-relative mx-2 mt-2 mx-md-1 mx-lg-2">
                            <img className="story-img position-absolute" src={img_6} alt="" onClick={(e: any) => openModalStory(e)} />
                        </div>
                        <div id="6" className="story-wrap position-relative mx-2 mt-2 mx-md-1 mx-lg-2">
                            <img className="story-img position-absolute" src={img_7} alt="" onClick={(e: any) => openModalStory(e)} />
                        </div>
                        <div id="7" className="story-wrap position-relative mx-2 mt-2 mx-md-1 mx-lg-2">
                            <img className="story-img position-absolute" src={img_8} alt="" onClick={(e: any) => openModalStory(e)} />
                        </div>
                        <div id="8" className="story-wrap position-relative mx-2 mt-2 mx-md-1 mx-lg-2">
                            <img className="story-img position-absolute" src={img_9} alt="" onClick={(e: any) => openModalStory(e)} />
                        </div>
                    </div>
                </Carousel.Item>
            </Carousel>
            <Stories
                show={showModalStories} indexStory={indexStory}
                onHide={() => setShowModalStories(false)} />
        </>
    );
}

export default CarouselStory;