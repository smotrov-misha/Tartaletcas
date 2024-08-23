import { useState, useEffect } from "react";
import { updateQuantityMade } from "../../backend/InWorkChanges";
function DishInWork({ dish, index, changeDishQuantity }) {
  const {
    quantity: quantity,
    quantityMade: quantityMade,
    id: id,
    dish: { name: name },
  } = dish;
  const [howManyMade, setHowManyMade] = useState(quantityMade);
  const [checked, setChecked] = useState(
    quantityMade === quantity ? true : false
  );

  useEffect(() => {
    changeDishQuantity(index, howManyMade);
  }, [howManyMade]);

  const increment = () => {
    if (howManyMade < quantity) {
      setHowManyMade(howManyMade + 1);
    }
    if (howManyMade === quantity - 1) {
      setChecked(true);
    }
  };

  const decrement = () => {
    if (howManyMade > 0) {
      setHowManyMade(howManyMade - 1);
    }
    if (howManyMade <= quantity) {
      setChecked(false);
    }
  };

  const handleInputChange = (event) => {
    const value = Number(event.target.value);
    if (value >= 0 && value <= Number(quantity)) {
      setHowManyMade(value);
      if (value === Number(quantity)) {
        setChecked(true);
      } else {
        setChecked(false);
      }
    }
  };
  const handleCheckboxChange = (event) => {
    // props.changeCheckmark(props.index, event.target.checked);
    setChecked(event.target.checked);
    if (event.target.checked && quantity > howManyMade) {
      setHowManyMade(quantity);
      // props.changeDishAmount(props.amount, props.index);
    } else if (!event.target.checked) {
      setHowManyMade(0);
      // props.changeDishAmount(0, props.index);
    }
  };

  return (
    <div className="dish-in-work">
      <div className="name-of-dish">
        <h3>{name}</h3>
      </div>
      <div className="how-many-made">
        <button onClick={decrement}>
          <h3>-</h3>
        </button>
        <input
          type="text"
          placeholder="0"
          min="0"
          value={howManyMade}
          max={quantity}
          onChange={handleInputChange}
        />
        <button onClick={increment}>
          <h3>+</h3>
        </button>
      </div>
      <div className="how-many-dish">
        <h3>{quantity}</h3>
        <label className="check-dishes">
          <input
            type="checkbox"
            onChange={handleCheckboxChange}
            checked={checked}
            value={checked}
          />
          <span className="checkmark"></span>
        </label>
      </div>
    </div>
  );
}

export default DishInWork;
