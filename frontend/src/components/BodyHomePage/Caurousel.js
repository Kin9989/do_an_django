import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import ExampleCarouselImage from '../BodyHomePage/ImgBaner/bg_1.webp'
import Image from 'react-bootstrap/Image';
function UncontrolledExample() {
    return (
        <Carousel   >
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    style={{ maxHeight: '800px' }}
                    src={'https://64.media.tumblr.com/284c3df93de8da0753ea1c2916819fb6/tumblr_noo2rzUrHn1ruw5mdo1_1280.jpg'}
                    alt="First slide"

                />
                <Carousel.Caption>
                    {/* <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    style={{ maxHeight: '800px' }}
                    className="d-block w-100"
                    src={'https://64.media.tumblr.com/284c3df93de8da0753ea1c2916819fb6/tumblr_noo2rzUrHn1ruw5mdo1_1280.jpg'}
                    alt="Second slide"
                />
                <Carousel.Caption>
                    {/* <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    style={{ maxHeight: '800px' }}
                    className="d-block w-100"
                    src={'https://64.media.tumblr.com/284c3df93de8da0753ea1c2916819fb6/tumblr_noo2rzUrHn1ruw5mdo1_1280.jpg'}
                />
                <Carousel.Caption>
                    {/* <h3>Third slide label</h3>
                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p> */}
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}

export default UncontrolledExample;
