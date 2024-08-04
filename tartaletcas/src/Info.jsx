import './Info.css'
import cross_button from './assets/cross_button.png'
import pencil from './assets/pencil.png'
import { useState } from 'react'
import NewOrder from './makingInfo'

function Info(props) {
    
    const [editIsOn, setEditIsOn] = useState(false);

    const switchOnEdit = () => {
        setEditIsOn(true);
    }

    const switchOffEdit = () => {
        setEditIsOn(false);
        props.closeInfo();
    }

    return (
        <>
        <div className="overlay" style={{display: editIsOn ? "none" : "block"}}>
            <div className='container' style={{display: editIsOn ? "none" : "block"}}>
                <div className='info-buttons'>
                    <button className='cancel-button' onClick={props.closeInfo}><img src={cross_button}></img></button>
                    <button className='edit-button' onClick={switchOnEdit}><img src={pencil} className="pencil"></img></button>
                </div>
                <h2 className='menu-name'>{props.itemName}</h2>
                <h3 className='title'>Dishes</h3>
                <hr className='dividing-line'/>
                <div>
                    {props.dishes.map(dish => (dish.amount != 0 && (<div key = {dish.id} className='dish'>
                                                    <h3>{dish.name}</h3>
                                                    <h3>{dish.amount}</h3>
                                                </div>)))}
                </div>
                <hr className='dividing-line' id='bottom-dividing-line'/>
                <h3 className='title'>Description</h3>
                <p>{props.description}</p>
                <h3 className='title'>Notes</h3>
                <p>{props.notes}</p>
                <div className='deadline-container'>
                    <h3 className='title'>Deadline</h3>
                    <p className='deadline-date'>{props.deadline}</p>
                </div>
            </div>
        </div>
        {
            editIsOn && (<NewOrder orderName={props.itemName} dishes={props.dishes}
                                description={props.description} notes={props.notes} 
                                deadline={props.deadline} closeNewOrder={switchOffEdit} toDo="edit"
                                changePreparationItems={props.changePreparationItems} id={props.id} section={props.section}/>)
        }
        </>
    );
}

export default Info