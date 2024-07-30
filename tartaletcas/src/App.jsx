import React,{ useState } from 'react'
import './App.css'
import dropArrow from './assets/drop_down_arrow.png'
import infoButton from './assets/information-button.png'
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

  const increment = () => {
    if(howManyMade < props.howMany) setHowManyMade(howManyMade + 1);
  }

  const decrement = () => {
    if(howManyMade > 0) setHowManyMade(howManyMade - 1);
  }

  const handleInputChange = (event) => {
    const value = Number(event.target.value);
    if(value >= 0 && value <= props.howMany) {
      setHowManyMade(value);
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
          <input type="checkbox"/>
          <span className="checkmark"></span>
        </label>
      </div>
    </div>
  );
}

function Inworkitem() {

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
        <div className="real-progress"></div>
      </div>
      {isExpanded && (
        <>
          <Dishinwork howMany = {200} Product = "Salmon"/>
          <Dishinwork howMany = {30} Product = "Sex"/>
          <Dishinwork howMany = {40} Product = "Beach"/>
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
