import { useState, useEffect } from 'react'
import dropArrow from './assets/drop_down_arrow.png'
import infoButton from './assets/infromation-button.png'
import Info from './Info';

function ProductInPreparation(props) {

    const [checked, setChecked] = useState(false);

    const handleCheckboxChange = (event) => {
        setChecked(event.target.checked);
      };
      
    return(
        <>
        <div className='product-in-prep'>
            <h3 className='product-name-in-prep'>{props.name}</h3>
            <div className = "how-many-product">
                <h3>{props.amount}</h3>
                <label className = "check-product">
                    <input type="checkbox"  onChange={handleCheckboxChange} checked = {checked}/>
                    <span className="checkmark"></span>
                </label>
      </div>
        </div>
        </>
    )
}

function PreparationItem({ item }) {
    const dishes = [ {id: 1, Product: 'Salmon', howMany: 4540},
    {id: 2, Product: 'Sex', howMany: 30},
    {id: 3, Product: 'Bitch', howMany: 20}];
    const [isExpanded, setIsExpanded] = useState(false);
    const expand = () => {
        setIsExpanded(!isExpanded);
    }

    const [infoIsOpened, setInfoIsOpened] = useState(false);

    const closeInfo = () => {
        setInfoIsOpened(!infoIsOpened);
    }
    
    const openInfo = () => {
        setInfoIsOpened(true);
    }
    return(
    <>
        <div className="work-prep-item prep-item" style={{ paddingBottom: isExpanded ? "20px" : "0px"}}>
            <div className="work-prep-things">
                <div className="name-n-info">
                    <h2 className="item-name">{item.orderName}</h2>
                    <button onClick={openInfo}>
                        <img src={infoButton}></img>
                    </button>
                </div>
                <button id="arrow" onClick={expand} style={{ transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)" }}>
                    <img src={dropArrow} alt="Expand/Collapse" />
                </button>
            </div>
            {isExpanded && (
                <>
                    {item.dishes.map(product => (product.amount != 0 && (<ProductInPreparation key={product.id} amount={product.amount} name={product.name}/>)))}
                </>
      )}
        </div>
        {infoIsOpened && <Info itemName={item.orderName} dishes={item.dishes} closeInfo={closeInfo} description={item.description}
         notes={item.notes} deadline={item.deadline}/>}
    </>
  )
}

export default PreparationItem