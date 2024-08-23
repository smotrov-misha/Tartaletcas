import { useState, useEffect, useRef } from "react";
import client from "../../backend/Client";
import DishInWork from "./DishInWork.jsx";
import { updateQuantityMade } from "../../backend/InWorkChanges.jsx";

function InWorkDishes({ itemId, setPercentage }) {
  const [dishes, setDishes] = useState([]);
  const dishesRef = useRef(dishes);
  const [sumOfMadeDishes, setSumOfMadeDishes] = useState(0);
  const [sumOfDishes, setSumOfDishes] = useState(0);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      updateQuantityMade(dishesRef.current);

      event.preventDefault();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    setPercentage(((sumOfMadeDishes / sumOfDishes) * 100).toFixed(2) + "%");
  }, [sumOfMadeDishes]);

  useEffect(() => {
    dishesRef.current = dishes;
  }, [dishes]);

  useEffect(() => {
    const fetchDishes = async () => {
      const { data: fetchedDishes } = await client.models.OrdersDishes.list({
        selectionSet: ["quantity", "quantityMade", "id", "dish.name"],
        filter: {
          orderId: {
            eq: itemId,
          },
        },
      });
      setDishes(fetchedDishes);
      setSumOfDishes(
        fetchedDishes.reduce((acc, dish) => acc + Number(dish.quantity), 0)
      );
      setSumOfMadeDishes(
        fetchedDishes.reduce((acc, dish) => acc + Number(dish.quantityMade), 0)
      );
    };

    fetchDishes();

    return () => {
      updateQuantityMade(dishesRef.current);
    };
  }, []);

  const changeDishQuantity = (i, val) => {
    const newDishes = dishes.map((dish) => ({ ...dish }));
    setSumOfMadeDishes(sumOfMadeDishes - newDishes[i].quantityMade + val);
    newDishes[i].quantityMade = val;
    setDishes(newDishes);
  };

  return (
    <>
      {dishes.map((dish, i) => (
        <DishInWork
          key={dish.id}
          dish={dish}
          index={i}
          changeDishQuantity={changeDishQuantity}
        />
      ))}
    </>
  );
}

export default InWorkDishes;
