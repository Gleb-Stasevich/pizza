import { useState, useEffect, useRef } from 'react';

import Carousel from 'react-bootstrap/Carousel';
import { Modal } from 'react-bootstrap';
import background from '../Carousels/assetsStories/story-carousel-1.png';
import ProgressBar from 'react-bootstrap/ProgressBar';


import story1 from './stories-backgrounds/story-1.png';
import story2 from './stories-backgrounds/story-2.png';
import story3 from './stories-backgrounds/story-3.png';
import story4 from './stories-backgrounds/story-4.png';
import story5 from './stories-backgrounds/story-5.png';
import story6 from './stories-backgrounds/story-6.png';
import story7 from './stories-backgrounds/story-7.png';
import story8 from './stories-backgrounds/story-8.png';
import story9 from './stories-backgrounds/story-9.png';

import './stories.scss';

const Stories = (props: any) => {

    const { onHide, show } = props;

    const [index, setIndex] = useState<number>(0);
    const [counter, setCounter] = useState<number>(0);
    const storiesItems = 8;

    const handleSelect = (selectedIndex: number) => {
        resetCounter();
        setIndex(selectedIndex);
    };

    const intervalRef = useRef<NodeJS.Timeout | number>(0);

    useEffect(() => {

        if (props.show === true) {
            resetCounter();
            setCounter(0);
            setTimeout(() => { incrementCounter() }, 0);
        } else if (props.show === false) {
            resetCounter();
            setCounter(0);
        }

    }, [props.show, index]);

    useEffect(() => {
        if (counter === 100) {
            resetCounter();
            if (index < storiesItems) {
                setIndex(index => index + 1);
            } else if (index === storiesItems) {
                setIndex(0);
            }
            return;
        }
    }, [counter]);

    useEffect(() => {

        handleSelect(props.indexStory);
    }, [props.indexStory]);

    const incrementCounter = () => {
        intervalRef.current = setInterval(() => {
            setCounter(prevState => prevState += 1)
        }, 100);
    };

    const resetCounter = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = 0;
    };

    return (
        <>
            {
                props.show === true ? (
                    <>
                        <img className="stories-background position-absolute" src={background} alt="smth"></img>
                        <Modal className="modal-stories"
                            onHide={() => onHide()}
                            show={show}
                            size="lg"
                            aria-labelledby="contained-modal-title-vcenter"
                            centered>
                            <Modal.Header closeButton>
                            </Modal.Header>
                            <Modal.Body className="modal-body-stories">
                                <Carousel activeIndex={index} onSelect={handleSelect} interval={null} pause={false}>
                                    <Carousel.Item>
                                        <ProgressBar now={counter} />
                                        <img className="story-img-first" src={story1} alt="smth"></img>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <ProgressBar now={counter} />
                                        <img src={story2} alt="smth"></img>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <ProgressBar now={counter} />
                                        <img src={story3} alt="smth"></img>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <ProgressBar now={counter} />
                                        <img src={story4} alt="smth"></img>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <ProgressBar now={counter} />
                                        <img src={story5} alt="smth"></img>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <ProgressBar now={counter} />
                                        <img src={story6} alt="smth"></img>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <ProgressBar now={counter} />
                                        <img src={story7} alt="smth"></img>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <ProgressBar now={counter} />
                                        <img src={story8} alt="smth"></img>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <ProgressBar now={counter} />
                                        <img src={story9} alt="smth"></img>
                                    </Carousel.Item>

                                </Carousel>
                            </Modal.Body>
                        </Modal>
                    </>
                )
                    : null
            }
        </>
    )
};

export default Stories;