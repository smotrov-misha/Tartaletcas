import "./Info.css";
import cross_button from "../../assets/cross_button.png";
import pencil from "../../assets/pencil.png";
import { useState, useEffect } from "react";
import client from "../../backend/Client";
import { connectInfoToDishes } from "../../backend/PreparationChanges";
import OrderEditWindow from "../OrderEditWindow/OrderEditWindow";

function Info({ id, closeInfo, unexpand }) {
  const [editIsOn, setEditIsOn] = useState(false);
  const [info, setInfo] = useState({});
  useEffect(() => {
    unexpand(false);
    const subscriptionOrders = client.models.Orders.observeQuery({
      selectionSet: [
        "id",
        "name",
        "description",
        "notes",
        "deadline",
        "dishes.*",
        "prepared",
      ],
      filter: {
        id: {
          eq: id,
        },
      },
    }).subscribe({
      next: async ({ items }) => {
        const dishesWithNames = await connectInfoToDishes(items[0].dishes);
        const fullInfo = { ...items[0], dishes: dishesWithNames };
        setInfo(fullInfo);
      },
    });
    return () => {
      subscriptionOrders.unsubscribe();
    };
  }, []);

  const switchOnEdit = () => {
    setEditIsOn(true);
  };

  const switchOffEdit = () => {
    setEditIsOn(false);
    closeInfo();
  };

  return (
    <>
      <div className="overlay" style={{ display: editIsOn ? "none" : "block" }}>
        <div
          className="container info"
          style={{ display: editIsOn ? "none" : "block" }}
        >
          <div className="info-buttons">
            <button className="cancel-button" onClick={closeInfo}>
              <img src={cross_button}></img>
            </button>
            <button className="edit-button" onClick={switchOnEdit}>
              <img src={pencil} className="pencil"></img>
            </button>
          </div>
          <h2 className="menu-name">{info.name || ""}</h2>
          {
            <>
              <h3 className="">Dishes</h3>
              <hr className="dividing-line" />
              {info.dishes && (
                <>
                  <div>
                    {info.dishes.map((dish) => (
                      <div key={dish.id} className="dish">
                        <h3>{dish.name}</h3>
                        <h3>{dish.quantity}</h3>
                      </div>
                    ))}
                  </div>
                </>
              )}
              <hr className="dividing-line" id="bottom-dividing-line" />
            </>
          }
          {info.description && (
            <>
              <h3 className="">Description</h3>
              <p>{info.description}</p>
            </>
          )}
          {info.notes && (
            <>
              <h3 className="">Notes</h3>
              <p>{info.notes}</p>
            </>
          )}
          {info.deadline && (
            <>
              <div className="deadline-container">
                <h3 className="deadline-title">Deadline</h3>
                <p className="deadline-date">{info.deadline}</p>
              </div>
            </>
          )}
        </div>
      </div>
      {editIsOn && (
        <OrderEditWindow
          dishes={info.dishes}
          newOrder={info}
          closeNewOrder={switchOffEdit}
          mode="Edit"
        />
      )}
    </>
  );
}

export default Info;
