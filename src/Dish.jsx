import React,{ useState, useEffect } from 'react'
import dropArrow from './assets/drop_down_arrow.png'
import './dish.css'
import rainbowCake from './assets/rainbow_cake.png'
import edit from './assets/pencil.png'
import {NewDish} from './makingInfo.jsx'

function Dish({dish, changeDishes}) {

    const [isExpanded, setIsExpanded] = useState(false);
    const [editIsOpened, setEditIsOpened] = useState(false);

    const openEdit = () => {
        setEditIsOpened(true);
    }

    const closeEdit = () => {
        setEditIsOpened(false);
    }

    const expand = () => {
        setIsExpanded(!isExpanded);
    }
    return (
        <>
        <div className='dishes-item'>
            <h2 className='title'>{dish.name}</h2>
            <button className='edit' onClick={openEdit}>
                <img src={edit}></img>
            </button>
            <div className='img-description' style={{justifyContent: dish.image ? "space-between" : "end"}}>
                {
                dish.image &&
                (<img src={dish.image}></img>)
                }
                {
                    dish.description && (
                    <p>{dish.description}
                    </p>)
                }
            </div>
            <button className="arrow" onClick={expand} style={{ transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)" }}>
                <img src={dropArrow}></img>
            </button>
            {isExpanded && (<>
                {
                dish.weight &&
                (<div className='weight-calories'>
                    <h2 className='mini-title'>Weight</h2>
                    <h2 className='mini-title'>{String(dish.weight) + " gr"}</h2>
                </div>)
                }
                {
                dish.calories &&
                (<div className='weight-calories'>
                    <h2 className='mini-title'>Calories</h2>
                    <h2 className='mini-title'>{String(dish.calories) + " kcal"}</h2>
                </div>)
                }
                {
                dish.ingredients.length > 0 && (<>
                <h2 className='mini-title'>Ingredients</h2>
                {
                    dish.ingredients.map((ingredient) => (
                        <div className='ingredient' key = {ingredient.id}>
                            <p>{ingredient.name}</p>
                            <p>{ingredient.quantity + " " + ingredient.unit}</p>
                        </div>
                    ))
                }</>)
                }
                {
                dish.recipe && (<>
                <h2 className='mini-title'>Recipe</h2>
                <p className='text'>{dish.recipe}</p></>)
                }
            </>)}
            {
                editIsOpened && <NewDish closeNewDish = {closeEdit} changeDishes = {changeDishes} dish = {dish}/>
            }
        </div>
        </>
    )
}

export default Dish