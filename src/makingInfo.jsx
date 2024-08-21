import { useState } from "react";
import cross_button from "./assets/cross_button.png";
import "./MakingInfo.css";
import { NewTemplate } from "./Templates.jsx";
import plus from "./assets/plus.svg";
import minus from "./assets/minus.png";
import chooseFile from "./assets/chooseFile.png";
import { compact } from "lodash";

function NewOrder(props) {
  const [name, setName] = useState(props.name || "");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const [dishEditor, setDishEditor] = useState(false);

  const openDishEditor = () => {
    setDishEditor(true);
  };

  const closeDishEditor = () => {
    setDishEditor(false);
  };

  const [currentDishes, setCurrentDishes] = useState(props.dishes);

  const changeDishesInOrder = (newDishes) => {
    setCurrentDishes(newDishes);
  };

  const [description, setDescription] = useState(props.description || "");

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const [notes, setNotes] = useState(props.notes || "");

  const handleNotes = (e) => {
    setNotes(e.target.value);
  };

  const [deadline, setDeadline] = useState(props.deadline || "");

  const handleDeadline = (e) => {
    setDeadline(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) return alert("Type in order name");
    if (props.toDo == "add") {
      const newOrder = {
        name: name,
        dishes: currentDishes,
        description: description,
        notes: notes,
        deadline: deadline,
        toDo: "add",
      };
      props.changePreparationItems(newOrder);
    } else if (props.toDo == "edit") {
      const newOrder = {
        name: name,
        dishes: currentDishes,
        description: description,
        notes: notes,
        deadline: deadline,
        toDo: "edit",
        id: props.id,
        prepared: props.prepared,
      };
      props.changePreparationItems(newOrder);
    }
    props.closeNewOrder();
  };
  return (
    <div className="overlay">
      <div className="container">
        <div className="info-buttons">
          <button className="cancel-button" onClick={props.closeNewOrder}>
            <img src={cross_button}></img>
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Order name"
            className="new-order-name"
            onChange={handleNameChange}
            value={name || ""}
          ></input>
          <h3 className="title">Dishes</h3>
          <hr className="dividing-line" />
          <div>
            {currentDishes.map(
              (dish) =>
                dish.quantity != 0 && (
                  <div
                    key={dish.id}
                    className="dish"
                    style={{ opacity: dishEditor ? "0" : "1" }}
                  >
                    <h3>{dish.name}</h3>
                    <h3>{dish.quantity}</h3>
                  </div>
                )
            )}
          </div>
          <button
            className="new-order-button"
            onClick={openDishEditor}
            style={{ opacity: dishEditor ? "0" : "1" }}
            type="button"
          >
            Edit
          </button>
          <hr className="dividing-line" id="bottom-dividing-line" />
          <h3 className="title">Description</h3>
          <textarea
            placeholder="Type something"
            value={description || ""}
            onChange={handleDescription}
          ></textarea>
          <h3 className="title">Notes</h3>
          <textarea
            placeholder="Type something"
            value={notes || ""}
            onChange={handleNotes}
          ></textarea>
          <div className="deadline-new-container deadline-container">
            <h3 className="title">Deadline</h3>
            <input
              type="date"
              className="deadline-date deadline-new-date"
              value={deadline || ""}
              onChange={handleDeadline}
            ></input>
          </div>
          <button className="new-order-button done-button" type="submit">
            Done
          </button>
        </form>
        {dishEditor && (
          <NewTemplate
            closeNewTemplate={closeDishEditor}
            dishes={props.allDishes}
            mode="New order"
            changeDishesInOrder={changeDishesInOrder}
          />
        )}
      </div>
    </div>
  );
}

export default NewOrder;
