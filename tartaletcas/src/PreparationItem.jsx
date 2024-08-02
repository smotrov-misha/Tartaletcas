import React,{ useState, useEffect } from 'react'
import dropArrow from './assets/drop_down_arrow.png'
import infoButton from './assets/infromation-button.png'
import Info from './Info';

function ProductInPreparation(props) {
    

    return(
        <>
        <div className='product-in-prep'>
            <h3>{props.Product}</h3>
        </div>
        </>
    )
}

function PreparationItem(props) {
    const dishes = [ {id: 1, Product: 'Salmon', howMany: 4540},
        {id: 2, Product: 'Sex', howMany: 30},
        {id: 3, Product: 'Bitch', howMany: 20}
      ];

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
        <div className="work-prep-item prep-item">
            <div className="work-prep-things">
                <div className="name-n-info">
                    <h2 className="item-name">{props.itemName}</h2>
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
                    {props.products.map(product => (<PreparationItem id={product.id} howMany={product.howMany} Product={product.Product}/> ))}
                </>
      )}
        </div>
        {infoIsOpened && <Info itemName={props.itemName} dishes={dishes} closeInfo={closeInfo}/>}
    </>
  )
}

export default PreparationItem