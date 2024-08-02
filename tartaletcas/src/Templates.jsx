import './Templates.css'
import plus from './assets/plus.svg'
import cross_button from './assets/cross_button.png'
import React,{ useState, useEffect } from 'react'

function NewTemplate(props) {

    const editMode = props.id ? true : false;
    const [templateName, setTemplateName] = useState(props.templateName);

    const handleTemplateNameChange = (e) => {
        setTemplateName(e.target.value);
    }

    const [dishAmount, setDishAmount] = useState(props.dishes);
    
    const handleDishAmountChange = (e, index) => {
        const updatedDishAmount = [...dishAmount];
        updatedDishAmount[index].amount = e.target.value;
        setDishAmount(updatedDishAmount);
    }

    const handleSubmit = (e) => {
        if(!editMode) {
        const newTemplate = {templateName: templateName, dishes: [...dishAmount]};
        console.log(newTemplate);
        props.addTemplate(newTemplate);
        }
        else {
            const newTemplate = {templateName: templateName, dishes: [...dishAmount], id: props.id};
            console.log(newTemplate);
            props.changeTemplate(newTemplate);
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
        <div className='container container-new-template'>
            <button className='cancel-button template-cancel-button' onClick={props.closeNewTemplate}><img src={cross_button}></img></button>
            <form onSubmit={handleSubmit}>
            <input type='text' placeholder='Template name' className='new-template-name' onChange={handleTemplateNameChange} value={templateName}></input>
            <div className='container-for-adding-dishes'>
               <>
                {props.dishes.map(dish => (<div className='chosen-dish' key={dish.id}>
                    <h3>{dish.name}</h3>
                    <input type='text' placeholder='0' onChange={(e) => handleDishAmountChange(e, dish.id - 1)} value = {dishAmount[dish.id - 1].amount || ""}></input>
                    </div>))}
                    </>
            </div>
            <button class='template-button done-template-button' type='submit'>Done</button>
            </form>
            {
                editMode && <button class='template-button delete-template-button' onClick={deleteTemplate}>Delete</button>
            }
        </div>
    </div>
    </>
    );
}

function Template(props) {
    const [openEditing, setOpenEditing] = useState(false);

    const openEdit = () => {
        setOpenEditing(true);
    }

    const closeEdit = () => {
        setOpenEditing(false);
    }

    return (
        <>
        <div className='container-for-template'> 
                <h2 className='template-name'>{props.templateName}</h2>
                <div className='template-dishes'>
                {props.dishes.map(dish => (
                    dish.amount != 0 && (
                        <div className='template-dish-container' key={dish.id}>
                            <h3>{dish.name}</h3>
                            <h3>{dish.amount}</h3>
                        </div>
                    )
                ))}
                </div>
                <div className='template-buttons-container'>
                    <button class='template-button' onClick={openEdit}>Edit</button>
                    <button class='template-button'>Start</button>
                </div>
        </div>
        { 
        openEditing && <NewTemplate closeNewTemplate={closeEdit} templateName={props.templateName}
        dishes={props.dishes} id={props.id} changeTemplate={props.changeTemplate} deleteTemplate={props.deleteTemplate}/>
        }
        </>
    );
}


function Templates(props) {

    const dishesNewTemplate = [{id: 1, name: "tartaletcas", amount: 0}, {id: 2, name: "bigass", amount: 0}, {id: 3, name: "ahahah", amount: 0}, 
    {id: 4, name: "porn", amount: 0}, {id: 5, name: "kaka", amount: 0}, {id: 6, name: "lala", amount: 0},
     {id: 7, name: "arrra", amount: 0}, {id: 8, name: "opurn", amount: 0}, {id: 9, name: "lecsus", amount: 0}];

    const [newTemplateIsOpened, setNewTemplateIsOpened] = useState(false);

     const closeNewTemplate = () => {
        setNewTemplateIsOpened(false);
     }
   
     const openNewTemplate = () => {
       setNewTemplateIsOpened(true);
     }

     const [templates, setTemplates] = useState([{templateName: "pidoras", dishes: [{id: 1, name: "tartaletcas", amount: 5}], id: 100}]);

     const addTemplate = (newTemplate) => {
        newTemplate.id = lastTemplateId;
        incrementTemplateId();
        console.log(lastTemplateId);
        setTemplates([...templates, newTemplate]);
     }
     

     const changeTemplate = (newTemplate) => {
        for(let i = 0; i < templates.length; i++) {
            if(templates[i].id === newTemplate.id) {
                const newTemplateArray = [...templates];
                newTemplateArray[i] = newTemplate;
                setTemplates(newTemplateArray);
                break;
            }
        }
     }

     const deleteTemplate = (id) => {
        for(let i = 0; i < templates.length; i++) {
            if(templates[i].id === id) {
                const newTemplateArray = [...templates];
                newTemplateArray.splice(i, 1);
                setTemplates(newTemplateArray);
                break;
            }
        }
     }

     const [lastTemplateId, setLastTemplateId] = useState(1);

     const incrementTemplateId = () => {
        setLastTemplateId(lastTemplateId + 1);
     }

    return ( 
        <>
        <div className='above-part-templates'>
        <h1>Templates</h1>
        <button class='add-button' onClick={openNewTemplate}><img src={plus}></img></button>
        </div>
        <div className='templates-grid'>
            {
                templates.map(template => (<Template templateName = {template.templateName} dishes = {template.dishes}
                                            id = {template.id} changeTemplate={changeTemplate} deleteTemplate={deleteTemplate}/>))
            }
        </div>
        {
            newTemplateIsOpened && <NewTemplate closeNewTemplate={closeNewTemplate} addTemplate={addTemplate} 
            templateName='' dishes={dishesNewTemplate}/>
        }
        </>
    );
}

export default Templates;