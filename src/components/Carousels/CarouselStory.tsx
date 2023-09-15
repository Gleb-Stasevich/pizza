import Carousel from 'react-bootstrap/Carousel';
import './storyCarousel.scss';

import img_1 from '../../assets/storyCarousel/story-carousel-1.png';
import img_2 from '../../assets/storyCarousel/story-carousel-2.png';
import img_3 from '../../assets/storyCarousel/story-carousel-3.png';
import img_4 from '../../assets/storyCarousel/story-carousel-4.png';
import img_5 from '../../assets/storyCarousel/story-carousel-5.png';
import img_6 from '../../assets/storyCarousel/story-carousel-6.png';
import img_7 from '../../assets/storyCarousel/story-carousel-7.png';
import img_8 from '../../assets/storyCarousel/story-carousel-8.png';
import img_9 from '../../assets/storyCarousel/story-carousel-9.png';

const CarouselStory = () => {
    return (
        <>
            <Carousel interval={null}>
                <Carousel.Item>
                    <div className="story d-flex">
                        <div className="story-wrap position-relative mx-2">
                            <img className="story-img position-absolute" src={img_1} alt="" />
                        </div>
                        <div className="story-wrap position-relative mx-2">
                            <img className="story-img position-absolute" src={img_2} alt="" />
                        </div>
                        <div className="story-wrap position-relative mx-2">
                            <img className="story-img position-absolute" src={img_3} alt="" />
                        </div>
                        <div className="story-wrap position-relative mx-2">
                            <img className="story-img position-absolute" src={img_4} alt="" />
                        </div>
                        <div className="story-wrap position-relative mx-2">
                            <img className="story-img img_slice position-absolute" src={img_5} alt="" />
                            <div className="story_slice position-absolute"></div>
                        </div>
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className="story d-flex">
                        <div className="story-wrap position-relative mx-1">
                            <img className="story-img position-absolute" src={img_6} alt="" />
                        </div>
                        <div className="story-wrap position-relative mx-1">
                            <img className="story-img position-absolute" src={img_7} alt="" />
                        </div>
                        <div className="story-wrap position-relative mx-1">
                            <img className="story-img position-absolute" src={img_8} alt="" />
                        </div>
                        <div className="story-wrap position-relative mx-1">
                            <img className="story-img position-absolute" src={img_9} alt="" />
                        </div>
                    </div>
                </Carousel.Item>
            </Carousel>
        </>
    );
}

export default CarouselStory;