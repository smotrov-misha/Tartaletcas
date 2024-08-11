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
import searchIcon from './assets/search.png';
import { generateClient } from 'aws-amplify/data';
/**
 * @type {import('aws-amplify/data').Client<import('../amplify/data/resource').Schema>}
 */

let client = generateClient();

function Background() {
  return (
    <>
      <span className = "dot" id = "first-circle"></span>
      <span className = "dot" id = "second-circle"></span>
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
      {preparationItems.map(prepItem => (prepItem.section === "Preparation" ?
      (<PreparationItem key = {prepItem.id} item = {prepItem} changePreparationItems = {changePreparationItems}/>) : null)
      )}
      </>
    </>
  )
}

function Dishes({changeDishes, dishes, ingredients}) {
  const [newIsOpened, setNewIsOpened] = useState(false);
  const [search, setSearch] = useState('');
  const [currentSearch, setCurrentSearch] = useState('');
  const openNewDish = () => {
    setNewIsOpened(true);
  }

  const closeNewDish = () => {
    setNewIsOpened(false);
  }

  const handleSearch = (e) => {
    setCurrentSearch(e.target.value);
  }

  const searchFor = () => {
    setSearch(currentSearch);
  }

  return (
    <>
    <div className = "dishes-top-items">
      <div className='equal'>
      <h1 className='top-title'>Dishes</h1>
      </div>
      <div className='search'>
        <input type='text' list='all-dishes' onChange={handleSearch} value={currentSearch || ""}/>
        <datalist id='all-dishes'>
          {
            dishes.map(dish => (<option key={dish.id}>{dish.name}</option>))
          }
        </datalist>
        <button className='search-button' onClick={searchFor}><img src={searchIcon}></img></button>
      </div>
      <div className='equal'>
      <button className='add-button' onClick={openNewDish}><img src={plus}></img></button>
      </div>
    </div>
    {
      newIsOpened && <NewDish closeNewDish = {closeNewDish} changeDishes = {changeDishes}/>
    }
    {
      dishes.map((dish) => {
        if(search == dish.name.substring(0, search.length) || search.length == 0) {
        return <Dish dish = {dish} key = {dish.id} changeDishes={changeDishes} 
        ingredients = {ingredients.filter(ingredient => ingredient.dishId === dish.id)}/>
      }
    })
    }
    </>
  )
}

function App() {
  const [whatPage, setWhatPage] = useState("Menus");
  const [lastDishId, setLastDishId] = useState(1);
  const [lastTemplateId, setLastTemplateId] = useState(1);
  const [lastPrepId, setLastPrepId] = useState(1);
  const [preparationItems, setPreparationItems] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [ingredients, setIngredients] = useState([]);


  useEffect(() => {
    client.models.Dishes.observeQuery().subscribe({
      next: (data) => setDishes([...data.items]),
    });
    client.models.Ingredients.observeQuery().subscribe({
      next: (data) => setIngredients([...data.items]),
    });
  }, []);

  const changePage = (nameOfPage) => {
    setWhatPage(nameOfPage);
  };

  //templates
  const addTemplate = (newTemplate) => {
    newTemplate.id = lastTemplateId;
    setLastTemplateId(lastTemplateId + 1);
    setTemplates([...templates, newTemplate]);
 }
 
 const changeTemplate = (newTemplate) => {
    setTemplates(templates.map(template => template.id === newTemplate.id ? newTemplate : template));
 }

 const deleteTemplate = (id) => {
    setTemplates(templates.filter(template => template.id !== id));
 }

 //dishes
  const changeDishes = async (dish) => {
    if(dish.toDo == "add") {
      const {data: newDish} = await client.models.Dishes.create({
        name: dish.name,
        image: dish.image,
        description: dish.description,
        recipe: dish.recipe,
        weight: dish.weight,
        calories: dish.calories,
      });
      for (const ingredient of dish.ingredients) {
        await client.models.Ingredients.create({
          name: ingredient.name,
          quantity: ingredient.quantity,
          unit: ingredient.unit,
          dishId: newDish.id
        });
      }
    }
    else if(dish.toDo == "edit") {
        delete dish.toDo;
        await client.models.Dishes.update({
          id: dish.id,
          name: dish.name,
          image: dish.image,
          description: dish.description,
          recipe: dish.recipe,
          weight: dish.weight,
          calories: dish.calories,
        });
        const {data: ingrToDelete} = await client.models.Ingredients.list({filter: {
          fields: {
            dishId: dish.id,
          },
        },
      });
        for(const ingredient of ingrToDelete) {
          await client.models.Ingredients.delete({
            id: ingredient.id
          })
        }
        for(const ingredient of dish.ingredients) {
          await client.models.Ingredients.create({
            name: ingredient.name,
            quantity: ingredient.quantity,
            unit: ingredient.unit,
            dishId: dish.id
          })
        }
    }
    else if(dish.toDo == "delete") {
      for (const ingredient of dish.ingredients) {
        await client.models.Ingredients.delete({
          id: ingredient.id,
        });
      }
      await client.models.Dishes.delete({
        id: dish.id
      })
    }
  }

  //preparation_items
  const changePreparationItems = (preparationItem) => {
    if(preparationItem.toDo == "add") {
      delete preparationItem.toDo;
      preparationItem.id = lastPrepId;
      setLastPrepId(lastPrepId + 1);
      const newPreparationItems = [...preparationItems, preparationItem];
      setPreparationItems(newPreparationItems);
    }
    else if(preparationItem.toDo == "edit") {
      delete preparationItem.toDo;
      const newPreparationItems = preparationItems.map(item =>
        item.id === preparationItem.id ? preparationItem : item
      );
      setPreparationItems(newPreparationItems);
      }
    else if(preparationItem.toDo == "delete") {
      const newPreparationItems = preparationItems.filter((item) => preparationItem.id !== item.id);
      setPreparationItems(newPreparationItems);
    }
    else if(preparationItem.toDo == "prep->inwork") {
      preparationItem.section = "In work";
      delete preparationItem.toDo;
      const newPreparationItems = preparationItems.filter((item) => preparationItem.id !== item.id);
      newPreparationItems.push(preparationItem);
      setPreparationItems(newPreparationItems);
    }
   }

   useEffect(() => {
    setTemplates(templates =>
      templates.map(template => {
          const updatedDishes = dishes.map(dish => {
              const existingDish = template.dishes.find(tDish => tDish.id === dish.id);
              return existingDish ? { ...dish, amount: existingDish.amount } : { ...dish, amount: ''};
          });
          return { ...template, dishes: updatedDishes };
      })
  );
   }, [dishes]);

  return (
    <>
    <Background/>
    <Navbar changePage={changePage}/>
    {whatPage === "Menus" && (
      <>
      <Inwork inWorkItems = {preparationItems} changeInWorkItems = {changePreparationItems}/>
      <Preparation preparationItems = {preparationItems} changePreparationItems = {changePreparationItems}/>
      <Templates changePreparationItems = {changePreparationItems} dishes={dishes} addTemplate={addTemplate} 
      changeTemplate={changeTemplate} deleteTemplate={deleteTemplate} templates={templates}/>
      </>
    )}
    {whatPage === "Dishes" && (
      <>
      <Dishes changeDishes = {changeDishes} dishes = {dishes} ingredients = {ingredients}/>
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
