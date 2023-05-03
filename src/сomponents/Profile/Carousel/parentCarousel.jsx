import { Carousel } from "./Carousel"
import React from "react"
import './parentCarousel.css'


export const ParentComponent = () => {
    return (
        <Carousel className='parent'>
            <div className="item item-1"></div>
            <div className="item item-2"></div>
            <div className="item item-3"></div>
        </Carousel>
    )
}