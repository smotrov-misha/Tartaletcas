import { useState, useEffect } from 'react'
import dropArrow from './assets/drop_down_arrow.png'
import infoButton from './assets/infromation-button.png'
import Info from './Info';

function ProductInPreparation(props) {

    const [checked, setChecked] = useState(props.checkValue);

    const handleCheckboxChange = (event) => {
        props.changeCheckmark(props.index, event.target.checked);
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

function PreparationItem({ item, changePreparationItems }) {
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

    const [products, setProducts] = useState([]);

    const changeProducts = () => {
        const productObject = {};
        for(let i = 0; i < item.dishes.length; i++) {
            if(item.dishes[i].amount != 0) {
            const ingredients = item.dishes[i].ingredients;
            const dishAmount = Number(item.dishes[i].amount);
            ingredients.forEach((ingredient) => {
                const quantity = Number(ingredient.quantity);
                if (!productObject[ingredient.name]) {
                    productObject[ingredient.name] = [dishAmount * quantity, ingredient.unit];
                } else {
                    productObject[ingredient.name][0] += dishAmount * quantity;
                }
            });
            }
        }
        
        const entries = Object.entries(productObject);
        const mappedEntries = entries.map(([key, value]) => {
            return {name: key, quantity: value[0], unit: value[1]};
        });
        setProducts(mappedEntries);
    }


    useEffect(() => {
        changeProducts();
    }, []);

    useEffect(() => {
        changeProducts();
    }, [item]);


    const [checkmarks, setCheckmarks] = useState(new Array(item.dishes.length).fill(false));
    const [allChecked, setAllChecked] = useState(false);

    const changeCheckmark = (i, val) => {
        const newCheckmarks = [...checkmarks];
        newCheckmarks[i] = val;
        for(let i = 0; i < newCheckmarks.length; i++) {
            if(newCheckmarks[i] == false && item.dishes[i].amount != 0) {
                setAllChecked(false);
                break;
            }
            if(i == newCheckmarks.length - 1) {
                setAllChecked(true);
            }
        }
        setCheckmarks(newCheckmarks);
    }

    const changeSection = () => {
        item.toDo = "prep->inwork";
        changePreparationItems(item);
    }

    return(
    <>
        <div className="work-prep-item prep-item" style={{ paddingBottom: isExpanded ? (allChecked ? "80px": "20px") : (allChecked ? "0px": "0px")}}>
            <div className="work-prep-things">
                <div className="name-n-info">
                    <h2 className="item-name">{item.orderName}</h2>
                    <button onClick={openInfo}>
                        <img src={infoButton}></img>
                    </button>
                </div>
                <button id="arrow" onClick={expand} style={{ transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)"}}>
                    <img src={dropArrow} alt="Expand/Collapse" />
                </button>
            </div>
            {isExpanded && (
                <>
                    {products.map((product, i) => ((<ProductInPreparation key={product.id} index={i} amount={product.quantity + " " + product.unit} name={product.name} checkValue={checkmarks[i]} changeCheckmark={changeCheckmark}/>)))}
                </>
            )}
            <button className='button-in-prep' style={{opacity: allChecked ? "1" : "0", transform: allChecked ? "scale(1)" : "scale(0)", bottom: isExpanded ? "20px" : "", top: isExpanded ? "" : "20px"}} onClick={changeSection}>Done</button>
        </div>
        {infoIsOpened && <Info itemName={item.orderName} dishes={item.dishes} closeInfo={closeInfo} description={item.description}
                                notes={item.notes} deadline={item.deadline} changePreparationItems={changePreparationItems}
                                id={item.id} section={item.section}/>}
    </>
  )
}

export default PreparationItem