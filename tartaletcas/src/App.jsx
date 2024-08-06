import React,{ useState, useEffect } from 'react'
import './App.css'
import dropArrow from './assets/drop_down_arrow.png'
import infoButton from './assets/infromation-button.png'
import Info from './Info';
import Templates from './Templates';
import PreparationItem from './PreparationItem.jsx'
import Dish from './Dish.jsx'
import plus from './assets/plus.svg'
import { NewDish } from './makingInfo.jsx';
import search from './assets/search.png';

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
    <div className='navigation'>
    <div className = "nav-bar">
      <button onClick={() => {changePage("Menus")}}>Menus</button>
      <button onClick={() => {changePage("Dishes")}}>Dishes</button>
      <button onClick={() => {changePage("History")}}>History</button>
    </div>
    <hr className='nav-line'/>
    </div>
  );
}

function Dishinwork(props) {
  const [howManyMade, setHowManyMade] = useState(props.dishesMade);
  const [checked, setChecked] = useState(props.checkmark);

  const increment = () => {
    if(howManyMade < props.amount) {
      setHowManyMade(howManyMade + 1);
      props.changeDishAmount(howManyMade + 1, props.index);
    }
    if(howManyMade === props.amount - 1) { 
      setChecked(true);
      props.changeCheckmark(props.index, true);
    }
  }

  const decrement = () => {
    if(howManyMade > 0) {
      setHowManyMade(howManyMade - 1);
      props.changeDishAmount(howManyMade - 1, props.index);
    }
    if(howManyMade <= props.amount) {
      setChecked(false);
      props.changeCheckmark(props.index, false);
    }
  }



  const handleInputChange = (event) => {
    const value = Number(event.target.value);
    if(value >= 0 && value <= Number(props.amount)) {
      setHowManyMade(value);
      props.changeDishAmount(value, props.index);
      if(value === Number(props.amount)) {
        setChecked(true);
        props.changeCheckmark(props.index, true);
      }
      else {
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
    }
    else if(!event.target.checked) {
      setHowManyMade(0);
      props.changeDishAmount(0, props.index);
    }
  };

  return (
    <div className = "dish-in-work">
      <div className = "name-of-dish">
        <h3>{props.name}</h3>
      </div>
      <div className = "how-many-made">
        <button onClick={decrement}><h3>-</h3></button>
        <input type = "text" placeholder= "0" min = "0" value={howManyMade} max = {props.amount} onChange = {handleInputChange}/>
        <button onClick={increment}><h3>+</h3></button>
      </div>
      <div className = "how-many-dish">
        <h3>{props.amount}</h3>
        <label className = "check-dishes">
          <input type="checkbox"  onChange={handleCheckboxChange} checked = {checked} value = {checked}/>
          <span className="checkmark"></span>
        </label>
      </div>
    </div>
  );
}

function Inworkitem({item, changeInWorkItems}) {


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

  const sumOfDishes = item.dishes.reduce((accumulator, dish) => {
    if(dish.amount != 0) return accumulator + Number(dish.amount);
    else return accumulator;
  }, 0);


  const [amountOfDishes, setAmountOfDishes] = useState(new Array(item.dishes.length).fill(0));
  const [width, setWidth] = useState("0%");

  let sumOfAmountOfDishes = amountOfDishes.reduce((accumulator, amount) => {
  return accumulator + Number(amount)}, 0);

  let proportionProgressBar = sumOfAmountOfDishes / sumOfDishes;

  const changeDishAmount = (howManyMade, i) => {
      let newAmountOfDishes = [...amountOfDishes];
      let newSumOfAmountOfDishes = sumOfAmountOfDishes - Number(newAmountOfDishes[i]) + Number(howManyMade);
      let percentage = newSumOfAmountOfDishes / sumOfDishes * 100;
      newAmountOfDishes[i] = Number(howManyMade);
      setAmountOfDishes(newAmountOfDishes);
      setWidth(percentage + "%");
      }

  const [isExpanded, setIsExpanded] = useState(false);
  const expand = () => {
    setIsExpanded(!isExpanded);
  }

  const [infoIsOpened, setInfoIsOpened] = useState(false);

  const closeInfo = () => {
    setInfoIsOpened(false);
  }

  const openInfo = () => {
    setInfoIsOpened(true);
  }

  const itemIsDone = () => {
    item.toDo = "delete";
    changeInWorkItems(item);
  }

    return (
      <>
      <div className= "work-prep-item" style={(isExpanded && allChecked) ? {paddingBottom: "80px"} : {}}>
        <div className = "work-prep-things">
          <div className = "name-n-info">
          <h2 className = "item-name">{item.orderName}</h2>
          <button onClick={openInfo}><img src={infoButton}></img></button>
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
          {item.dishes.map((dish, i) => ( dish.amount != 0 &&
          (<Dishinwork key={dish.id} index={i} amount={dish.amount} dishesMade={amountOfDishes[i]} 
            name={dish.name} changeDishAmount={changeDishAmount}
             changeCheckmark={changeCheckmark} checkmark={checkmarks[i]}/>)
          ))}
        </>
      )}
        <button className='button-in-prep'
         style={{opacity: allChecked ? "1" : "0", transform: allChecked ? "scale(1)" : "scale(0)",
          bottom: isExpanded ? "20px" : "", top: isExpanded ? "" : "20px"}} onClick={itemIsDone}>Done</button>
    </div>
    {
      infoIsOpened && <Info itemName={item.orderName} dishes={item.dishes} closeInfo={closeInfo} description={item.description}
      notes={item.notes} deadline={item.deadline} changePreparationItems={changeInWorkItems}
      id={item.id} section={item.section}/>
    }
    </>
    );
}
  

function Inwork({inWorkItems, changeInWorkItems}) {

return (
  <>
  <h1 className='top-title'>In work</h1>
  {inWorkItems.map(item => ( item.section == "In work" &&
  (<Inworkitem key = {item.id} item = {item} changeInWorkItems = {changeInWorkItems}/>))
  )}
  </>
);
}

function Preparation({preparationItems, changePreparationItems}) {
  return (
    <>
    <h1>Preparation</h1>
      <>
      {preparationItems.map(prepItem => ( prepItem.section == "Preparation" &&
      (<PreparationItem key = {prepItem.id} item = {prepItem} changePreparationItems = {changePreparationItems}/>))
      )}
      </>
    </>
  )
}

function Dishes({changeDishes, dishes}) {
  const [newIsOpened, setNewIsOpened] = useState(false);

  const openNewDish = () => {
    setNewIsOpened(true);
  }

  const closeNewDish = () => {
    setNewIsOpened(false);
  }
  return (
    <>
    <div className = "dishes-top-items">
      <div className='equal'>
      <h1 className='top-title'>Dishes</h1>
      </div>
      <div className='search'>
        <input type='text'/>
        <button className='search-button'><img src={search}></img></button>
      </div>
      <div className='equal'>
      <button className='add-button' onClick={openNewDish}><img src={plus}></img></button>
      </div>
    </div>
    {
      newIsOpened && <NewDish closeNewDish = {closeNewDish} changeDishes = {changeDishes}/>
    }
    {
      dishes.map((dish) => (
        <Dish dish = {dish} key = {dish.id} changeDishes={changeDishes}/>
      ))
    }
    </>
  )
}

function App() {

  const [dishes, setDishes] = useState([]);
  const [lastDishId, setLastDishId] = useState(1);

  const changeDishes = (dish) => {
    if(dish.toDo == "add") {
      dish.id = lastDishId;
      setLastDishId(lastDishId + 1);
      const newDishes = [...dishes, dish];
      setDishes(newDishes);
    }
    else if(dish.toDo == "edit") {
      const newDishes = dishes.map(d => {
        if(d.id === dish.id) return dish;
        else return d;
      });
      setDishes(newDishes);
    }
    else if(dish.toDo == "delete") {
      const newDishes = dishes.filter(d => (d.id !== dish.id));
      setDishes(newDishes);
    }
  }


  const [whatPage, setWhatPage] = useState("Dishes");

  const changePage = (nameOfPage) => {
    setWhatPage(nameOfPage);
  };

  const [lastPrepId, setLastPrepId] = useState(1);

  const [preparationItems, setPreparationItems] = useState([]);

  const changePreparationItems = (preparationItem) => {
    if(preparationItem.toDo == "add") {
      preparationItem.id = lastPrepId;
      setLastPrepId(lastPrepId + 1);
      const newPreparationItems = [...preparationItems, preparationItem];
      setPreparationItems(newPreparationItems);
    }
    else if(preparationItem.toDo == "edit") {
      for(let i = 0; i < preparationItems.length; i++) {
        if(preparationItems[i].id == preparationItem.id) {
          const newPreparationItems = [...preparationItems];
          newPreparationItems[i] = preparationItem;
          setPreparationItems(newPreparationItems);
          break;
        }
      }
    }
    else if(preparationItem.toDo == "delete") {
      const newPreparationItems = preparationItems.filter((item) => preparationItem.id !== item.id);
      setPreparationItems(newPreparationItems);
    }
    else if(preparationItem.toDo == "prep->inwork") {
      preparationItem.section = "In work";
      const newPreparationItems = preparationItems.filter((item) => preparationItem.id !== item.id);
      newPreparationItems.push(preparationItem);
      setPreparationItems(newPreparationItems);
    }
   }

  return (
    <>
    <Background/>
    <Navbar changePage={changePage}/>
    {whatPage === "Menus" && (
      <>
      <Inwork inWorkItems = {preparationItems} changeInWorkItems = {changePreparationItems}/>
      <Preparation preparationItems = {preparationItems} changePreparationItems = {changePreparationItems}/>
      <Templates changePreparationItems = {changePreparationItems} dishes={dishes}/>
      </>
    )}
    {whatPage === "Dishes" && (
      <>
      <Dishes changeDishes = {changeDishes} dishes = {dishes}/>
      </>
    )}
    {whatPage === "History" && (
      <>
      
      </>
    )}
    <h3 className='our-names'>Made by Kharchenko & Smotrov</h3>
    </>
  );
}

export default App
