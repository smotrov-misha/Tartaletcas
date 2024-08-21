import React, { useState, useEffect } from "react";
import dropArrow from "../../assets/drop_down_arrow.png";
import "./Dish.css";
import edit from "../../assets/pencil.png";
import DishEditWindow from "../DishEditWindow/DishEditWindow";
import client from "../../backend/Client";

function Dish({ dish }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [editIsOpened, setEditIsOpened] = useState(false);
  const [ingredients, setIngredients] = useState(dish.ingredients);

  // useEffect(() => {
  //   client.models.Dishes.observeQuery().subscribe({
  //     next: (data) =>
  //       setIngredients(
  //         data.items.filter(dish.)
  //       ),
  //   });
  // }, []);

  const openEdit = () => {
    setEditIsOpened(true);
  };

  const closeEdit = () => {
    setEditIsOpened(false);
  };

  const expand = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <>
      <div className="dishes-item">
        <h2 className="title">{dish.name}</h2>
        <button className="edit" onClick={openEdit}>
          <img src={edit}></img>
        </button>
        <div
          className="img-description"
          style={{ justifyContent: dish.image ? "space-between" : "end" }}
        >
          {dish.image && <img src={dish.image}></img>}
          {dish.description && <p>{dish.description}</p>}
        </div>
        <button
          className="arrow"
          onClick={expand}
          style={{ transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          <img src={dropArrow}></img>
        </button>
        {isExpanded && (
          <>
            {dish.weight && (
              <div className="weight-calories">
                <h2 className="mini-title">Weight</h2>
                <h2 className="mini-title">{String(dish.weight) + " gr"}</h2>
              </div>
            )}
            {dish.calories && (
              <div className="weight-calories">
                <h2 className="mini-title">Calories</h2>
                <h2 className="mini-title">
                  {String(dish.calories) + " kcal"}
                </h2>
              </div>
            )}
            {dish.ingredients.length > 0 && (
              <>
                <h2 className="mini-title">Ingredients</h2>
                {dish.ingredients.map((ingredient, i) => (
                  <div className="ingredient" key={i}>
                    <p>{ingredient.name}</p>
                    <p>{ingredient.quantity + " " + ingredient.unit}</p>
                  </div>
                ))}
              </>
            )}
            {dish.recipe && (
              <>
                <h2 className="mini-title">Recipe</h2>
                <p className="text">{dish.recipe}</p>
              </>
            )}
          </>
        )}
        {editIsOpened && (
          <DishEditWindow closeNewDish={closeEdit} dish={{ ...dish }} />
        )}
      </div>
    </>
  );
}

export default Dish;
