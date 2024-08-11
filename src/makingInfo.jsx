import { useState } from 'react';
import cross_button from './assets/cross_button.png'
import './MakingInfo.css'
import {NewTemplate} from './Templates.jsx'
import plus from './assets/plus.svg'
import minus from './assets/minus.png'
import chooseFile from './assets/chooseFile.png'
import { compact } from 'lodash';

function NewOrder(props) {

    const [orderName, setOrderName] = useState(props.orderName || '');

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

    const [description, setDescription] = useState(props.description || '');

    const handleDescription = (e) => {
        setDescription(e.target.value);
    }

    const [notes, setNotes] = useState(props.notes || '');

    const handleNotes = (e) => {
        setNotes(e.target.value);
    }

    const [deadline, setDeadline] = useState(props.deadline || '');

    const handleDeadline = (e) => {
        setDeadline(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!orderName) return alert("Type in order name");
        if(props.toDo == "add") {
            const newOrder = {orderName: orderName, dishes: currentDishes, description: description, notes: notes, deadline: deadline, toDo: "add", section: "Preparation"};
            props.changePreparationItems(newOrder);
        }
        else if(props.toDo == "edit") {
            const newOrder = {orderName: orderName, dishes: currentDishes, description: description, notes: notes, deadline: deadline, toDo: "edit", id: props.id, section: props.section};
            props.changePreparationItems(newOrder);
        }
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
                        {currentDishes.map(dish => (dish.quantity != 0 && (<div key = {dish.id} className='dish' style={{opacity: dishEditor ? "0" : "1"}}>
                                                    <h3>{dish.name}</h3>
                                                    <h3>{dish.quantity}</h3>
                                                </div>)))}
                    </div>
                    <button className='new-order-button' onClick={openDishEditor} style={{opacity: dishEditor ? "0" : "1"}} type='button'>Edit</button>
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
                    dishes={currentDishes} mode="New order" changeDishesInOrder={changeDishesInOrder}/>
                }
            </div>
        </div>
    );
}

export function NewDish({closeNewDish, changeDishes, dish}) {
    const mode = dish ? "edit" : "add";
    const[ingredients, setIngredients] = useState(dish ? dish.ingredients.map((ingredient) => ({...ingredient})) : []);
    const [nextId, setNextId] = useState(dish ? dish.nextIngredientId : 1);

    const addIngredient = (event) => {
        event.preventDefault();
        const newIngredient = {id: nextId};
        setNextId(nextId + 1);
        setIngredients([...ingredients, newIngredient]); 
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewDish({ ...newDish, image: reader.result });
            };
            reader.readAsDataURL(file);
        }
    }

    const deleteIngredient = (id) => (event) => {
        event.preventDefault();
        setIngredients(ingredients.filter((ingredient) => ingredient.id != id));
    }

    const handleIngredientChange = (id, prop, value) => {
        if(prop == "quantity") value = value.replace(/[^0-9]/g, '');
        setIngredients(ingredients.map((ingredient) => 
            ingredient.id === id ? {...ingredient, [prop]: value} : ingredient
        ));
    };

    const [newDish, setNewDish] = useState(dish ? {...dish} : {});

    const handleDishChange = (prop, value) => {
        if(prop == "weight" || prop == "calories") value = value.replace(/[^0-9]/g, '');
        setNewDish({...newDish, [prop]: value});
    }
    const handleFormSubmit = (e) => {
        e.preventDefault();
        if(ingredients.every(ingredient => {
            return (!ingredient.quantity || !ingredient.unit || !ingredient.name);
        }) && ingredients.length != 0) return alert("Information about ingredients isn't completed");
        if(!newDish.name) return alert("Dish doesn't have a name");
        const completedDish = {...newDish};
        completedDish.ingredients = ingredients.map(ingredient => ({...ingredient}));
        completedDish.toDo = mode;
        completedDish.nextIngredientId = nextId + 1;
        changeDishes(completedDish);
        closeNewDish();
    }

    const deleteDish = (e) => {
        const deleteDish = {...newDish};
        deleteDish.toDo = "delete";
        changeDishes(deleteDish);
        e.preventDefault();
        closeNewDish();
    }

    return (
        <div className="overlay">
            <div className='container edit-dish'>
                <div className='info-buttons'>
                    <button className='cancel-button' onClick={closeNewDish}><img src={cross_button}></img></button>
                    {
                        mode === "edit"  && (<button className='delete-button' onClick={(e) => deleteDish(e)}>Delete</button>)
                    }
                </div>
                <form onSubmit={handleFormSubmit}>
                    <input type='text' placeholder='Dish name' className='new-order-name dish-name' onChange={(e) => handleDishChange('name', e.target.value)} value={newDish.name || ''}></input>
                    <div className='image-description'>
                        <div className='image'>
                        <input type='file' accept="image/*" onChange={handleImageChange}></input>
                        <button className = 'choose-file'><img src={chooseFile}/></button>
                        {newDish.image && <img src={newDish.image} alt="dish" className ='dish-image'/>}
                        </div>
                        <div className='description'>
                            <h3 className='small-title'>Description</h3>
                            <textarea onChange={(e) => handleDishChange('description', e.target.value)} value={newDish.description || ''}></textarea>
                        </div>
                    </div>
                    <div className="weight-calories">
                        <h3>Weight</h3>
                        <div>
                            <input type='text' onChange={(e) => handleDishChange('weight', e.target.value)} value={newDish.weight || ''}></input>
                            <h3>gr</h3>
                        </div>
                    </div>
                    <div className="weight-calories">
                        <h3>Calories</h3>
                        <div>
                            <input type='text' onChange={(e) => handleDishChange('calories', e.target.value)} value={newDish.calories || ''}></input>
                            <h3>kcal</h3>
                        </div>
                    </div>
                    <h3 className='small-title'>Ingredients</h3>
                    {
                        ingredients.map((ingredient) => (
                            <div className='ingredient' key={ingredient.id}>
                            <input type='text' className="ingredient-name" placeholder='Ingredient name' value={ingredient.name || ''}
                             onChange={(e) => handleIngredientChange(ingredient.id, 'name', e.target.value)}/>
                            <div className='quantity-unit'>
                                <input type='text' placeholder='quantity' value={ingredient.quantity || ''}
                                 onChange={(e) => handleIngredientChange(ingredient.id, 'quantity', e.target.value)}/>
                                <input type='text' list="value-type" placeholder='unit' value={ingredient.unit || ''}
                                 onChange={(e) => handleIngredientChange(ingredient.id, 'unit', e.target.value)}/>
                                <datalist id="value-type">
                                    <option>kg</option>
                                    <option>gr</option>
                                    <option>l</option>
                                    <option>ml</option>
                                    <option>pieces</option>
                                </datalist>
                                <button className='delete-ingredient-button' onClick={deleteIngredient(ingredient.id)}><img src={minus}></img></button>
                            </div>
                        </div>
                        ))
                    }
                    <button className='add-ingredient-button' onClick={addIngredient}><img src={plus}></img></button>
                    <h3 className='small-title'>Recipe</h3>
                    <textarea onChange={(e) => handleDishChange('recipe', e.target.value)} value={newDish.recipe || ''}></textarea>
                    <button className='new-order-button done-button' type='submit'>Done</button>
                </form>
                {/* {
                    dishEditor && <NewTemplate closeNewTemplate={closeDishEditor}
                    dishes={currentDishes} mode="New order" changeDishesInOrder={changeDishesInOrder}/>
                } */}
            </div>
        </div>
    );
}

export default NewOrder