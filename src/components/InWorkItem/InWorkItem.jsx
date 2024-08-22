import { useState } from "react";
import dropArrow from "../../assets/drop_down_arrow.png";
import infoButton from "../../assets/infromation-button.png";
import Info from "../Info/Info";
import "./InWorkItem.css";
import InWorkDishes from "./InWorkDishes";

function InWorkItem({ item }) {
  const { name, id, isDone, percents } = item;
  const [isExpanded, setIsExpanded] = useState(false);
  const allChecked = isDone;
  const [infoIsOpened, setInfoIsOpened] = useState(false);
  const width = percents;

  const expand = () => {
    setIsExpanded(!isExpanded);
  };

  const closeInfo = () => {
    setInfoIsOpened(false);
  };

  const openInfo = () => {
    setInfoIsOpened(true);
  };

  // const sumOfDishes = item.dishes.reduce((accumulator, dish) => {
  //   return accumulator + Number(dish.amount);
  // }, 0);

  // let sumOfAmountOfDishes = amountOfDishes.reduce((accumulator, amount) => {
  //   return accumulator + Number(amount);
  // }, 0);

  // let proportionProgressBar = sumOfAmountOfDishes / sumOfDishes;

  // const changeDishAmount = (howManyMade, i) => {
  //   let newAmountOfDishes = [...amountOfDishes];
  //   let newSumOfAmountOfDishes =
  //     sumOfAmountOfDishes - Number(newAmountOfDishes[i]) + Number(howManyMade);
  //   let percentage = (newSumOfAmountOfDishes / sumOfDishes) * 100;
  //   newAmountOfDishes[i] = Number(howManyMade);
  //   setAmountOfDishes(newAmountOfDishes);
  //   setWidth(percentage + "%");
  // };

  const itemIsDone = () => {
    item.toDo = "delete";
    changeInWorkItems(item);
  };

  return (
    <>
      <div
        className="work-prep-item"
        style={isExpanded && allChecked ? { paddingBottom: "80px" } : {}}
      >
        <div className="work-prep-things">
          <div className="name-n-info">
            <h2 className="item-name">{name}</h2>
            <button onClick={openInfo}>
              <img src={infoButton}></img>
            </button>
          </div>
          <button
            id="arrow"
            onClick={expand}
            style={{
              transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
            }}
          >
            <img src={dropArrow} alt="Expand/Collapse" />
          </button>
        </div>
        <div className="full-progress">
          <div className="real-progress" style={{ width: width }}></div>
        </div>
        {isExpanded && <InWorkDishes itemId={id} />}
        <button
          className="button-in-prep"
          style={{
            opacity: allChecked ? "1" : "0",
            transform: allChecked ? "scale(1)" : "scale(0)",
            bottom: isExpanded ? "20px" : "",
            top: isExpanded ? "" : "20px",
          }}
          onClick={"itemIsDone"}
        >
          Done
        </button>
      </div>
      {infoIsOpened && <Info closeInfo={closeInfo} id={id} />}
    </>
  );
}

export default InWorkItem;
