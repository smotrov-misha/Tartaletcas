import React,{ useState, useEffect } from 'react'
import dropArrow from './assets/drop_down_arrow.png'
import './dish.css'
import rainbowCake from './assets/rainbow_cake.png'
import edit from './assets/pencil.png'

function Dish({dish}) {

    const [isExpanded, setIsExpanded] = useState(false);

    const expand = () => {
        setIsExpanded(!isExpanded);
    }
    return (
        <>
        <div className='dishes-item'>
            <h2 className='title'>{dish.name}</h2>
            <button className='edit'>
                <img src={edit}></img>
            </button>
            <div className='img-description'>
                <img src={dish.image}></img>
                <p>{dish.description}
                </p>
            </div>
            <button className="arrow" onClick={expand} style={{ transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)" }}>
                <img src={dropArrow}></img>
            </button>
            {isExpanded && (<>
                <div className='weight-calories'>
                    <h2 className='mini-title'>Weight</h2>
                    <h2 className='mini-title'>{String(dish.weight) + " gr"}</h2>
                </div>
                <div className='weight-calories'>
                    <h2 className='mini-title'>Calories</h2>
                    <h2 className='mini-title'>{String(dish.calories) + " kcal"}</h2>
                </div>
                <h2 className='mini-title'>Ingredients</h2>
                {
                    dish.ingredients.map((ingredient) => (
                        <div className='ingredient' key = {ingredient.id}>
                            <p>{ingredient.name}</p>
                            <p>{ingredient.quantity + " " + ingredient.unit}</p>
                        </div>
                    ))
                }
                <h2 className='mini-title'>Recipe</h2>
                <p className='text'>{dish.recipe}</p>
            </>)}
        </div>
        </>
    )
}

export default Dish