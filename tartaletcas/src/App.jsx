import React,{ useState, useEffect } from 'react'
import './App.css'
import dropArrow from './assets/drop_down_arrow.png'
import infoButton from './assets/infromation-button.png'
import { rotate } from 'three/examples/jsm/nodes/Nodes.js';

function Background() {
  return (
    <>
      <span className = "dot" id = "first-circle"></span>
      <span className = "dot" id = "second-circle"></span>
      <span className = "dot" id = "third-circle"></span>
    </>
  );
}

function Navbar({changePage}) {
  return (
    <>
    <div className = "nav-bar">
      <button onClick={() => {changePage("Menus")}}>Menus</button>
      <button onClick={() => {changePage("Dishes")}}>Dishes</button>
      <button onClick={() => {changePage("History")}}>History</button>
    </div>
    <hr/>
    </>
  );
}

function Dishinwork(props) {
  const [howManyMade, setHowManyMade] = useState(0);
  const [checked, setChecked] = useState(false);

  const increment = () => {
    if(howManyMade < props.howMany) {
      setHowManyMade(howManyMade + 1);
      props.changeDishAmount(howManyMade + 1, props.id);
    }
    if(howManyMade === props.howMany - 1) setChecked(true);
  }

  const decrement = () => {
    if(howManyMade > 0) {
      setHowManyMade(howManyMade - 1);
      props.changeDishAmount(howManyMade - 1, props.id);
    }
    if(howManyMade <= props.howMany) setChecked(false);
  }

  const setNumber = (val) => {
    setHowManyMade(val);
    props.changeDishAmount(val, props.id);
  }

  const handleInputChange = (event) => {
    const value = Number(event.target.value);
    if(value >= 0 && value <= props.howMany) {
      setHowManyMade(value);
      props.changeDishAmount(value, props.id);
      if(value === props.howMany) setChecked(true);
      else setChecked(false);
    }
  };
  const handleCheckboxChange = (event) => {
    setChecked(event.target.checked);
    if (event.target.checked && props.howMany > howManyMade) {
      setHowManyMade(props.howMany);
      props.changeDishAmount(props.howMany, props.id);
    }
    else if(!event.target.checked) {
      setHowManyMade(0);
      props.changeDishAmount(0, props.id);
    }
  };

  return (
    <div className = "dish-in-work">
      <div className = "name-of-dish">
        <h3>{props.Product}</h3>
      </div>
      <div className = "how-many-made">
        <button onClick={decrement}><h3>-</h3></button>
        <input type = "number" placeholder= "0" min = "0" value={howManyMade} max = {props.howMany} onChange = {handleInputChange}/>
        <button onClick={increment}><h3>+</h3></button>
      </div>
      <div className = "how-many-dish">
        <h3>{props.howMany}</h3>
        <label className = "check-dishes">
          <input type="checkbox"  onChange={handleCheckboxChange} checked = {checked}/>
          <span className="checkmark"></span>
        </label>
      </div>
    </div>
  );
}

function Inworkitem() {

  const dishes = [ {id: 1, Product: 'Salmon', howMany: 40},
    {id: 2, Product: 'Sex', howMany: 30},
    {id: 3, Product: 'Bitch', howMany: 20}
  ];

  const sumOfDishes = dishes.reduce((accumulator, dish) => {
    return accumulator + dish.howMany;
  }, 0);

  const [amountOfDishes, setAmountOfDishes] = useState([0, 0, 0]);

  let sumOfAmountOfDishes = amountOfDishes.reduce((accumulator, amount) => {
  return accumulator + amount}, 0);

  let proportionProgressBar = sumOfAmountOfDishes / sumOfDishes;

  const changeDishAmount = (howManyMade, id) => {
    let newAmountOfDishes = [...amountOfDishes];
    let newSumOfAmountOfDishes = sumOfAmountOfDishes - newAmountOfDishes[id - 1] + howManyMade;
    let percentage = newSumOfAmountOfDishes / sumOfDishes * 100;
    newAmountOfDishes[id - 1] = howManyMade;
    setAmountOfDishes(newAmountOfDishes);
    setWidth(percentage + "%");
  }

  const [width, setWidth] = useState("0%");
  console.log(width);
  // const handleProgressBar = (event) => {
  //   event.target.style.width = proportionProgressBar * 100 + "%";
  // };

  const [isExpanded, setIsExpanded] = useState(false);
  const expand = () => {
    setIsExpanded(!isExpanded);
  }
    return (
      <div className= "inwork-item">
        <div className = "inwork-things">
          <div className = "name-n-info">
          <h2 className = "item-name">Dinner for Andrew</h2>
          <button><img src={infoButton}></img></button>
          </div>
          <button id="arrow" onClick={expand} style={{ transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)" }}>
          <img src={dropArrow} alt="Expand/Collapse" />
        </button>
      </div>
      <div className="full-progress">
        <div className="real-progress" style = {{width: width}}></div>
      </div>
      {isExpanded && (
        <>
          {dishes.map(dish => (<Dishinwork key={dish.id} id={dish.id} howMany={dish.howMany} Product={dish.Product} amountOfDishes={amountOfDishes} changeDishAmount={changeDishAmount}/> ))};
        </>
      )}
    </div>
    );
}
  

function Inwork() {

return (
  <>
  <h1>In work</h1>
  <Inworkitem/>
  <Inworkitem/>
  </>
);
}

function App() {

  const [whatPage, setWhatPage] = useState("Menus");

  const changePage = (nameOfPage) => {
    setWhatPage(nameOfPage);
  };
  return (
    <>
    <Background/>
    <Navbar changePage={changePage}/>
    {whatPage === "Menus" && (
      <>
      <Inwork/>
      </>
    )}
    {whatPage === "Dishes" && (
      <>
      
      </>
    )}
    {whatPage === "History" && (
      <>
      
      </>
    )}
    </>
  );
}

export default App
