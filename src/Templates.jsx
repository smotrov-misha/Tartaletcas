import './Templates.css'
import plus from './assets/plus.svg'
import cross_button from './assets/cross_button.png'
import { useState, useEffect } from 'react'
import NewOrder from './makingInfo.jsx'

export function NewTemplate(props) {

    const editMode = (props.mode == "Edit template") ? true : false;
    const newOrderMode = (props.mode == "New order") ? true : false;
    const [name, setName] = useState(props.name);

    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    const [dishAmount, setDishAmount] = useState(props.dishes.map(dish => ({ ...dish })));
    
    const handleDishAmountChange = (e, index) => {
        const updatedDishAmount = [...dishAmount];
        updatedDishAmount[index].quantity = e.target.value.replace(/[^0-9]/g, '');
        setDishAmount(updatedDishAmount);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const realDishAmount = dishAmount.filter(dish => (dish.quantity != 0));
        if(!editMode && !newOrderMode) {
        if(!name) return alert("Type in template name");
        const newTemplate = {name: name, dishes: realDishAmount};
        props.addTemplate(newTemplate);
        }
        else if(editMode) {
            if(!name) return alert("Type in template name");
            const newTemplate = {name: name, dishes: realDishAmount, id: props.id};
            props.changeTemplate(newTemplate);
        }
        else if(newOrderMode) {
            props.changeDishesInOrder(realDishAmount);
        }
        props.closeNewTemplate();
    }

    const deleteTemplate = () => {
        props.deleteTemplate(props.id);
        props.closeNewTemplate();
    }
    return (
    <>
    <div className='overlay'>
        <div className={newOrderMode ? 'container-new-template edit-new-template' : 'container container-new-template'} style={{backgroundColor: newOrderMode ? "#CBC8C4" : "rgba(0,0,0,0.1)"}}>
            <button className='cancel-button template-cancel-button' onClick={props.closeNewTemplate}><img src={cross_button}></img></button>
            <form onSubmit={handleSubmit}>
            {
                !newOrderMode && (<input type='text' placeholder='Template name' className='new-template-name' onChange={handleNameChange} value={name}></input>)
            }
            <div className='container-for-adding-dishes' style={{translate: newOrderMode ? "0 calc(250px - 22.5vh)" : "0px 0px"}}>
               <>
                {props.dishes.map((dish, i) => (<div className='chosen-dish' key={dish.id}>
                    <h3>{dish.name}</h3>
                    <input type='text' placeholder='0' onChange={(e) => handleDishAmountChange(e, i)} value = {dishAmount[i].quantity || ""}></input>
                    </div>))}
                    </>
            </div>
            <button className='template-button done-template-button' type='submit'>Done</button>
            </form>
            {
                editMode && <button className='template-button delete-template-button' onClick={deleteTemplate}>Delete</button>
            }
        </div>
    </div>
    </>
    );
}

function Template(props) {

    const [editIsOpened, setEditIsOpened] = useState(false);
    const [startIsOpened, setStartIsOpened] = useState(false);

    const openStart = () => {
        setStartIsOpened(true);
    }

    const closeStart = () => {
        setStartIsOpened(false)
    }

    const openEdit = () => {
        setEditIsOpened(true);
    }

    const closeEdit = () => {
        setEditIsOpened(false);
    }

    return (
        <>
        <div className='container-for-template'> 
                <h2 className='template-name'>{props.name}</h2>
                <div className='template-dishes'>
                {props.dishes.map(dish => (
                    dish.quantity && Number(dish.quantity) != 0 && (
                        <div className='template-dish-container' key={dish.id}>
                            <h3>{dish.name}</h3>
                            <h3>{dish.quantity}</h3>
                        </div>
                    )
                ))}
                </div>
                <div className='template-buttons-container'>
                    <button className='template-button' onClick={openEdit}>Edit</button>
                    <button className='template-button' onClick={openStart}>Start</button>
                </div>
        </div>
        { 
            editIsOpened && <NewTemplate closeNewTemplate={closeEdit} name={props.name}
            dishes={props.allDishes} id={props.id} changeTemplate={props.changeTemplate} mode="Edit template" deleteTemplate={props.deleteTemplate}/>
        }
        {
            startIsOpened && <NewOrder dishes={props.dishes} closeNewOrder={closeStart} changePreparationItems={props.changePreparationItems} toDo="add"/>
        }
        </>
    );
}


function Templates({changePreparationItems, dishes, addTemplate, changeTemplate, deleteTemplate, templates, dishesTemplates}) {
    const [newTemplateIsOpened, setNewTemplateIsOpened] = useState(false);

     const closeNewTemplate = () => {
        setNewTemplateIsOpened(false);
     }
   
     const openNewTemplate = () => {
       setNewTemplateIsOpened(true);
     }

    const dishesForTemplate = dishesTemplates
    .map(item => {
    const dish = dishes.find(dish => item.dishId === dish.id);
    return {
      ...item,
      name: dish.name ? dish.name : "",
    };
  });

    return ( 
        <>
        <div className='above-part-templates'>
        <h1>Templates</h1>
        <button className='add-button' onClick={openNewTemplate}><img src={plus}></img></button>
        </div>
        <div className='templates-grid'>
            {
                templates.map(template => (<Template allDishes = {dishes} name = {template.name}
                     dishes = {dishesForTemplate.filter(item => item.templateId === template.id)}
                            id = {template.id} key = {template.id} changeTemplate={changeTemplate}
                                deleteTemplate={deleteTemplate} changePreparationItems={changePreparationItems}/>))
            }
        </div>
        {
            newTemplateIsOpened && <NewTemplate closeNewTemplate={closeNewTemplate} addTemplate={addTemplate} 
            dishes={dishes}/>
        }
        </>
    );
}

export default Templates;