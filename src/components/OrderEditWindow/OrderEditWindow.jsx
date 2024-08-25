import { useState } from "react";
import cross_button from "../../assets/cross_button.png";
import "./OrderEditWindow.css";
import NewTemplate from "../NewTemplate/NewTemplate";
import { createOrder, updateOrder } from "../../backend/PreparationChanges";

function OrderEditWindow({ dishes, newOrder, mode, closeNewOrder }) {
  const [dishEditor, setDishEditor] = useState(false);
  const [currentDishes, setCurrentDishes] = useState(dishes ? dishes : []);
  const [order, setOrder] = useState(newOrder ? newOrder : {});

  const handleOrder = (e, name) => {
    setOrder((prevOrder) => ({
      ...prevOrder,
      [name]: e.target.value,
    }));
  };
  const openDishEditor = () => {
    setDishEditor(true);
  };

  const closeDishEditor = () => {
    setDishEditor(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!order.name) return alert("Type in order name");
    if (mode === "Add") {
      createOrder({ ...order, dishes: currentDishes });
    } else if (mode === "Edit") {
      updateOrder({ ...order, dishes: currentDishes });
    }
    closeNewOrder();
  };

  return (
    <div className="overlay">
      <div className="container order">
        <div className="info-buttons">
          <button className="cancel-button" onClick={closeNewOrder}>
            <img src={cross_button}></img>
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Order name"
            maxLength="20"
            className="new-order-name"
            onChange={(e) => handleOrder(e, "name")}
            value={order.name || ""}
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
            value={order.description || ""}
            onChange={(e) => handleOrder(e, "description")}
          ></textarea>
          <h3 className="title">Notes</h3>
          <textarea
            placeholder="Type something"
            value={order.notes || ""}
            onChange={(e) => handleOrder(e, "notes")}
          ></textarea>
          <div className="deadline-new-container deadline-container">
            <h3 className="title">Deadline</h3>
            <input
              type="date"
              className="deadline-date deadline-new-date"
              value={order.deadline || ""}
              onChange={(e) => handleOrder(e, "deadline")}
            ></input>
          </div>
          <button className="new-order-button done-button" type="submit">
            Done
          </button>
        </form>
        {dishEditor && (
          <NewTemplate
            closeNewTemplate={closeDishEditor}
            mode="New Order"
            dishesInTemplate={currentDishes}
            setDishes={setCurrentDishes}
          />
        )}
      </div>
    </div>
  );
}

export default OrderEditWindow;
