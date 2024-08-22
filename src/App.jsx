import React, { useState, useEffect } from "react";
import "./App.css";
import dropArrow from "./assets/drop_down_arrow.png";
import infoButton from "./assets/infromation-button.png";
import Info from "./components/Info/Info.jsx";
import Templates from "./Templates";
import PreparationItem from "./components/PreparationItem/PreparationItem.jsx";
import Dish from "./components/Dish/Dish.jsx";
import plus from "./assets/plus.svg";
import { NewDish } from "./makingInfo.jsx";
import searchIcon from "./assets/search.png";
import { template } from "lodash";
import client from "./Client.jsx";

function App() {
  const [lastDishId, setLastDishId] = useState(1);
  const [lastTemplateId, setLastTemplateId] = useState(1);
  const [lastPrepId, setLastPrepId] = useState(1);
  const [preparationItems, setPreparationItems] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [dishesTemplates, setDishesTemplates] = useState([]);

  useEffect(() => {
    client.models.Dishes.observeQuery().subscribe({
      next: (data) => setDishes([...data.items]),
    });
    client.models.Ingredients.observeQuery().subscribe({
      next: (data) => setIngredients([...data.items]),
    });
    client.models.Templates.observeQuery().subscribe({
      next: (data) => setTemplates([...data.items]),
    });
    client.models.DishesTemplates.observeQuery().subscribe({
      next: (data) => setDishesTemplates([...data.items]),
    });
    client.models.Orders.observeQuery().subscribe({
      next: (data) => setPreparationItems([...data.items]),
    });
  }, []);

  //preparation_items
  const changePreparationItems = async (preparationItem) => {
    if (preparationItem.toDo == "add") {
      const { data: newPrepItem } = await client.models.Orders.create({
        name: preparationItem.name,
        description: preparationItem.description,
        notes: preparationItem.notes,
        deadline: preparationItem.deadline,
        prepared: false,
      });
      for (const dish of preparationItem.dishes) {
        await client.models.OrdersDishes.create({
          dishId: dish.id,
          orderId: newPrepItem.id,
          quantity: dish.quantity,
          quantityMade: 0,
        });
      }
    } else if (preparationItem.toDo == "edit") {
      delete preparationItem.toDo;
      const newPreparationItems = preparationItems.map((item) =>
        item.id === preparationItem.id ? preparationItem : item
      );
      setPreparationItems(newPreparationItems);
    } else if (preparationItem.toDo == "delete") {
      const newPreparationItems = preparationItems.filter(
        (item) => preparationItem.id !== item.id
      );
      setPreparationItems(newPreparationItems);
    } else if (preparationItem.toDo == "prep->inwork") {
      preparationItem.section = "In work";
      delete preparationItem.toDo;
      const newPreparationItems = preparationItems.filter(
        (item) => preparationItem.id !== item.id
      );
      newPreparationItems.push(preparationItem);
      setPreparationItems(newPreparationItems);
    }
  };

  return (
    <>
      {whatPage === "Menus" && (
        <>
          <Inwork
            inWorkItems={preparationItems}
            changeInWorkItems={changePreparationItems}
          />
          <Preparation
            preparationItems={preparationItems}
            changePreparationItems={changePreparationItems}
          />
          <Templates
            changePreparationItems={changePreparationItems}
            dishes={dishes}
            addTemplate={addTemplate}
            changeTemplate={changeTemplate}
            deleteTemplate={deleteTemplate}
            templates={templates}
            dishesTemplates={dishesTemplates}
          />
        </>
      )}
      {whatPage === "Dishes" && (
        <>
          <Dishes
            changeDishes={changeDishes}
            dishes={dishes}
            ingredients={ingredients}
          />
        </>
      )}
      {whatPage === "History" && <></>}
      <h3 className="our-names">Made by Kharchenko & Smotrov</h3>
    </>
  );
}

export default App;
