import React,{ useState, useEffect } from 'react'
import dropArrow from './assets/drop_down_arrow.png'
import './dish.css'
import rainbowCake from './assets/rainbow_cake.png'
import edit from './assets/edit_button.png'

function Dish(props) {
    const [isExpanded, setIsExpanded] = useState(false);
    const expand = () => {
        setIsExpanded(!isExpanded);
    }
    return (
        <>
        <div className='dishes_item'>
            <h2 className='title'>Rainbow Cake</h2>
            <button className='edit'>
                <img src={edit}></img>
            </button>
            <div className='img-description'>
                <img src={rainbowCake}></img>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Maecenas ut quam erat. Morbi efficitur nulla magna, vitae 
                    lobortis nisi suscipit eget. Nunc maximus risus a odio vehicula bibendum.
                </p>
            </div>
            <button className="arrow" onClick={expand} style={{ transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)" }}>
                <img src={dropArrow}></img>
            </button>
            {isExpanded && (<>
                <h2 className='mini-title'>Ingridients</h2>
                <div className='ingridient'>
                    <p>Tomatoes</p>
                    <p>4 pieces</p>
                </div>
                <div className='ingridient'>
                    <p>Pesto</p>
                    <p>500 gr</p>
                </div>
                <h2 className='mini-title'>Recipe</h2>
                <p className='text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Maecenas ut quam erat. Morbi efficitur nulla magna, vitae 
                    lobortis nisi suscipit eget. Nunc maximus risus a odio vehicula bibendum.</p>
            </>)}
        </div>
        </>
    )
}

export default Dish