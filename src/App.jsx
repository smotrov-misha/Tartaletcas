import React, { useState, useEffect } from "react";
import "./App.css";
import dropArrow from "./assets/drop_down_arrow.png";
import infoButton from "./assets/infromation-button.png";
import Info from "./Info";
import Templates from "./Templates";
import PreparationItem from "./PreparationItem.jsx";
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

  //templates
  const addTemplate = async (newTemplate) => {
    const { data: createdTemplate } = await client.models.Templates.create({
      name: newTemplate.name,
    });
    for (const dish of newTemplate.dishes) {
      await client.models.DishesTemplates.create({
        dishId: dish.id,
        templateId: createdTemplate.id,
        quantity: dish.quantity,
      });
    }
  };

  const changeTemplate = async (newTemplate) => {
    await client.models.Templates.update({
      id: newTemplate.id,
      name: newTemplate.name,
    });
    const { data: dishesToDelete } = await client.models.DishesTemplates.list({
      filter: {
        templateId: {
          eq: newTemplate.id,
        },
      },
    });
    for (const dish of dishesToDelete) {
      await client.models.DishesTemplates.delete({
        id: dish.id,
      });
    }
    for (const dish of newTemplate.dishes) {
      await client.models.DishesTemplates.create({
        dishId: dish.id,
        templateId: newTemplate.id,
        quantity: dish.quantity,
      });
    }
  };

  const deleteTemplate = async (id) => {
    const { data: dishesToDelete } = await client.models.DishesTemplates.list({
      filter: {
        templateId: {
          eq: id,
        },
      },
    });
    console.log(dishesToDelete);
    for (const dish of dishesToDelete) {
      await client.models.DishesTemplates.delete({
        id: dish.id,
      });
    }
    await client.models.Templates.delete({
      id: id,
    });
  };

  //dishes
  const changeDishes = async (dish) => {
    if (dish.toDo == "add") {
      const { data: newDish } = await client.models.Dishes.create({
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
          dishId: newDish.id,
        });
      }
    } else if (dish.toDo == "edit") {
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
      const { data: ingrToDelete } = await client.models.Ingredients.list({
        filter: {
          dishId: {
            eq: dish.id,
          },
        },
      });
      for (const ingredient of ingrToDelete) {
        await client.models.Ingredients.delete({
          id: ingredient.id,
        });
      }
      for (const ingredient of dish.ingredients) {
        await client.models.Ingredients.create({
          name: ingredient.name,
          quantity: ingredient.quantity,
          unit: ingredient.unit,
          dishId: dish.id,
        });
      }
    } else if (dish.toDo == "delete") {
      for (const ingredient of dish.ingredients) {
        await client.models.Ingredients.delete({
          id: ingredient.id,
        });
      }
      await client.models.Dishes.delete({
        id: dish.id,
      });
    }
  };

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
