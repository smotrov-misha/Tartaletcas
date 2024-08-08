import { useState, useEffect } from 'react';
import dropArrow from './assets/drop_down_arrow.png';
import infoButton from './assets/infromation-button.png';
import Info from './Info';

function ProductInPreparation(props) {
  const { name, amount, checkValue, index, changeCheckmark } = props;
  const [checked, setChecked] = useState(checkValue);

  const handleCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    changeCheckmark(index, isChecked);
    setChecked(isChecked);
  };

  useEffect(() => {
    setChecked(checkValue);
  }, [checkValue]);

  return (
    <div className='product-in-prep'>
      <h3 className='product-name-in-prep'>{name}</h3>
      <div className='how-many-product'>
        <h3>{amount}</h3>
        <label className='check-product'>
          <input type="checkbox" onChange={handleCheckboxChange} checked={checked} />
          <span className="checkmark"></span>
        </label>
      </div>
    </div>
  );
}

function PreparationItem({ item, changePreparationItems }) {
  const { section, orderName, dishes } = item;
  const [isExpanded, setIsExpanded] = useState(false);
  const [infoIsOpened, setInfoIsOpened] = useState(false);
  const [products, setProducts] = useState([]);
  const [checkmarks, setCheckmarks] = useState([]);
  const [allChecked, setAllChecked] = useState(false);

  const expand = () => setIsExpanded(!isExpanded);
  const closeInfo = () => setInfoIsOpened(false);
  const openInfo = () => setInfoIsOpened(true);

  const calculateProducts = () => {
    const productObject = {};
    dishes.forEach(dish => {
      if (dish.amount !== 0) {
        dish.ingredients.forEach(ingredient => {
          const quantity = Number(ingredient.quantity);
          const amount = Number(dish.amount);
          if (!productObject[ingredient.name]) {
            productObject[ingredient.name] = [amount * quantity, ingredient.unit];
          } else {
            productObject[ingredient.name][0] += amount * quantity;
          }
        });
      }
    });
    const entries = Object.entries(productObject);
    return entries.map(([key, value]) => ({
      name: key,
      quantity: value[0],
      unit: value[1]
    }));
  };

  useEffect(() => {
    const newProducts = calculateProducts();
    setProducts(newProducts);
    setCheckmarks(new Array(newProducts.length).fill(false));
  }, [dishes]);

  const changeCheckmark = (i, val) => {
    const newCheckmarks = [...checkmarks];
    newCheckmarks[i] = val;
    setCheckmarks(newCheckmarks);

    const allCheckedFlag = newCheckmarks.every((checked, index) => {
      return checked;
    });
    setAllChecked(allCheckedFlag);
  };

  const changeSection = () => {
    item.toDo = "prep->inwork";
    changePreparationItems(item);
  };

  return (
    <>
      <div className="work-prep-item prep-item" style={{ paddingBottom: isExpanded ? (allChecked ? "80px" : "20px") : (allChecked ? "0px" : "0px") }}>
        <div className="work-prep-things">
          <div className="name-n-info">
            <h2 className="item-name">{orderName}</h2>
            <button onClick={openInfo}>
              <img src={infoButton} alt="Info" />
            </button>
          </div>
          <button id="arrow" onClick={expand} style={{ transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)" }}>
            <img src={dropArrow} alt="Expand/Collapse" />
          </button>
        </div>
        {isExpanded && products.map((product, i) => (
          <ProductInPreparation key={i} index={i} amount={`${product.quantity} ${product.unit}`} name={product.name} checkValue={checkmarks[i]} changeCheckmark={changeCheckmark} />
        ))}
        <button className='button-in-prep' style={{ opacity: allChecked ? "1" : "0", transform: allChecked ? "scale(1)" : "scale(0)", bottom: isExpanded ? "20px" : "", top: isExpanded ? "" : "20px" }} onClick={changeSection}>Done</button>
      </div>
      {infoIsOpened && <Info itemName={item.orderName} dishes={item.dishes} closeInfo={closeInfo} description={item.description} notes={item.notes} deadline={item.deadline} changePreparationItems={changePreparationItems} id={item.id} section={item.section} />}
    </>
  );
}

export default PreparationItem;
