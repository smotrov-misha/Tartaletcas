function Dishinwork(props) {
  const [howManyMade, setHowManyMade] = useState(props.dishesMade);
  const [checked, setChecked] = useState(props.checkmark);

  const increment = () => {
    if (howManyMade < props.amount) {
      setHowManyMade(howManyMade + 1);
      props.changeDishAmount(howManyMade + 1, props.index);
    }
    if (howManyMade === props.amount - 1) {
      setChecked(true);
      props.changeCheckmark(props.index, true);
    }
  };

  const decrement = () => {
    if (howManyMade > 0) {
      setHowManyMade(howManyMade - 1);
      props.changeDishAmount(howManyMade - 1, props.index);
    }
    if (howManyMade <= props.amount) {
      setChecked(false);
      props.changeCheckmark(props.index, false);
    }
  };

  const handleInputChange = (event) => {
    const value = Number(event.target.value);
    if (value >= 0 && value <= Number(props.amount)) {
      setHowManyMade(value);
      props.changeDishAmount(value, props.index);
      if (value === Number(props.amount)) {
        setChecked(true);
        props.changeCheckmark(props.index, true);
      } else {
        setChecked(false);
        props.changeCheckmark(props.index, false);
      }
    }
  };
  const handleCheckboxChange = (event) => {
    props.changeCheckmark(props.index, event.target.checked);
    setChecked(event.target.checked);
    if (event.target.checked && props.amount > howManyMade) {
      setHowManyMade(props.amount);
      props.changeDishAmount(props.amount, props.index);
    } else if (!event.target.checked) {
      setHowManyMade(0);
      props.changeDishAmount(0, props.index);
    }
  };

  return (
    <div className="dish-in-work">
      <div className="name-of-dish">
        <h3>{props.name}</h3>
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
          max={props.amount}
          onChange={handleInputChange}
        />
        <button onClick={increment}>
          <h3>+</h3>
        </button>
      </div>
      <div className="how-many-dish">
        <h3>{props.amount}</h3>
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
