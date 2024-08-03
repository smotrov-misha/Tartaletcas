import { useState } from 'react';
import cross_button from './assets/cross_button.png'
import './MakingInfo.css'
import {NewTemplate} from './Templates.jsx'
function NewOrder(props) {

    const [orderName, setOrderName] = useState('');

    const handleOrderNameChange = (e) => {
        setOrderName(e.target.value);
    }

    const [dishEditor, setDishEditor] = useState(false);

    const openDishEditor = () => {
        setDishEditor(true);
    }

    const closeDishEditor = () => {
        setDishEditor(false);
    }

    const [currentDishes, setCurrentDishes] = useState(props.dishes);

    const changeDishesInOrder = (newDishes) => {
        setCurrentDishes(newDishes);
    }

    const [description, setDescription] = useState('');

    const handleDescription = (e) => {
        setDescription(e.target.value);
    }

    const [notes, setNotes] = useState('');

    const handleNotes = (e) => {
        setNotes(e.target.value);
    }

    const [deadline, setDeadline] = useState('');

    const handleDeadline = (e) => {
        setDeadline(e.target.value);
    }

    const handleSubmit = (e) => {
        const newOrder = {orderName: orderName, dishes: currentDishes, description: description, notes: notes, deadline: deadline, toDo: "add"};
        props.changePreparationItems(newOrder);
        e.preventDefault();
        props.closeNewOrder();
    }
    return (
        <div className="overlay">
            <div className='container'>
                <div className='info-buttons'>
                    <button className='cancel-button' onClick={props.closeNewOrder}><img src={cross_button}></img></button>
                </div>
                <form onSubmit={handleSubmit}>
                    <input type='text' placeholder='Order name' className='new-order-name' onChange={handleOrderNameChange} value={orderName || ''}></input>
                    <h3 className='title'>Dishes</h3>
                    <hr className='dividing-line'/>
                    <div>
                        {currentDishes.map(dish => (dish.amount != 0 && (<div key = {dish.id} className='dish'>
                                                    <h3>{dish.name}</h3>
                                                    <h3>{dish.amount}</h3>
                                                </div>)))}
                    </div>
                    <button className='new-order-button' onClick={openDishEditor} type='button'>Edit</button>
                    <hr className='dividing-line' id='bottom-dividing-line'/>
                    <h3 className='title'>Description</h3>
                    <textarea placeholder='Type something' value={description || ''} onChange={handleDescription}></textarea>
                    <h3 className='title'>Notes</h3>
                    <textarea placeholder='Type something' value={notes || ''} onChange={handleNotes}></textarea>
                    <div className='deadline-new-container deadline-container'>
                        <h3 className='title'>Deadline</h3>
                        <input type='date' className='deadline-date deadline-new-date' value={deadline || ''} onChange={handleDeadline}></input>
                    </div>
                    <button className='new-order-button done-button' type='submit'>Done</button>
                </form>
                {
                    dishEditor && <NewTemplate closeNewTemplate={closeDishEditor}
                    dishes={props.dishes} mode="New order" changeDishesInOrder={changeDishesInOrder}/>
                }
            </div>
        </div>
    );
}

export default NewOrder