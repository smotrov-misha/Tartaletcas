import { useState, useEffect } from "react";
import client from "../../backend/Client";
import DishInWork from "./DishInWork.jsx";
import { updatePercentage } from "../../backend/InWorkChanges.jsx";

function InWorkDishes({ itemId }) {
  const [dishes, setDishes] = useState([]);
  useEffect(() => {
    const subscriptionDishes = client.models.OrdersDishes.observeQuery({
      selectionSet: ["quantity", "quantityMade", "id", "dish.name"],
      filter: {
        orderId: {
          eq: itemId,
        },
      },
    }).subscribe({
      next: ({ items }) => {
        console.log("rfjvroijvroit");
        setDishes(items);
        updatePercentage(
          items.map((item) => ({ ...item })),
          itemId
        );
      },
    });
    return () => {
      subscriptionDishes.unsubscribe();
    };
  }, []);

  return (
    <>
      {dishes.map((dish, i) => (
        <DishInWork key={dish.id} dish={dish} />
      ))}
    </>
  );
}

export default InWorkDishes;
