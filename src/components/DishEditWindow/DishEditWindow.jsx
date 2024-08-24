import { useState } from "react";
import cross_button from "../../assets/cross_button.png";
import chooseFile from "../../assets/chooseFile.png";
import plus from "../../assets/plus.svg";
import "./DishEditWindow.css";
import minus from "../../assets/minus.png";
import { createDish, editDish, deleteDish } from "../../backend/DishChanges";
import { uploadData } from "aws-amplify/storage";
import { getUrl } from "aws-amplify/storage";
import { StorageImage } from "@aws-amplify/ui-react-storage";

export function DishEditWindow({ closeNewDish, dish }) {
  const mode = dish ? "edit" : "add";
  const [ingredients, setIngredients] = useState(
    dish ? dish.ingredients.map((ingredient) => ({ ...ingredient })) : []
  );
  const [newDish, setNewDish] = useState(dish ? { ...dish } : {});

  const addIngredient = (event) => {
    event.preventDefault();
    setIngredients([...ingredients, { name: "", quantity: "", unit: "" }]);
  };

  const [file, setFile] = useState();

  const handleImageChange = (event) => {
    const fileImg = event.target.files[0];
    if (fileImg) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewDish({ ...newDish, image: reader.result });
      };
      reader.readAsDataURL(fileImg);
    }
    setFile(event.target.files[0]);
  };

  const deleteIngredient = (id) => (event) => {
    event.preventDefault();
    setIngredients(ingredients.filter((ingredient, index) => index !== id));
  };

  const handleIngredientChange = (id, prop, value) => {
    if (prop == "quantity") value = value.replace(/[^0-9]/g, "");
    setIngredients(
      ingredients.map((ingredient, index) =>
        index === id ? { ...ingredient, [prop]: value } : ingredient
      )
    );
  };

  const handleDishChange = (prop, value) => {
    if (prop == "weight" || prop == "calories")
      value = value.replace(/[^0-9]/g, "");
    setNewDish({ ...newDish, [prop]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (
      ingredients.every((ingredient) => {
        return !ingredient.quantity || !ingredient.unit || !ingredient.name;
      }) &&
      ingredients.length != 0
    )
      return alert("Information about ingredients isn't completed");
    if (!newDish.name) return alert("Dish doesn't have a name");
    const completedDish = { ...newDish };
    completedDish.image = dish.image;
    completedDish.ingredients = ingredients.map((ingredient) => ({
      ...ingredient,
    }));
    if (mode === "add") {
      createDish(completedDish, file);
    } else if (mode === "edit") {
      editDish(completedDish, file);
    }
    closeNewDish();
  };

  const delDish = (e) => {
    deleteDish(dish);
    e.preventDefault();
    closeNewDish();
  };

  return (
    <div className="overlay">
      <div className="container edit-dish">
        <div className="info-buttons">
          <button className="cancel-button" onClick={closeNewDish}>
            <img src={cross_button}></img>
          </button>
          {mode === "edit" && (
            <button className="delete-button" onClick={(e) => delDish(e)}>
              Delete
            </button>
          )}
        </div>
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            placeholder="Dish name"
            className="new-dish-name dish-name"
            onChange={(e) => handleDishChange("name", e.target.value)}
            value={newDish.name || ""}
          />
          <div className="image-description">
            <div className="image">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              <button className="choose-file">
                <img src={chooseFile} />
              </button>
              {file && (
                <img src={newDish.image} alt="dish" className="dish-image" />
              )}
              {!file && dish.image && (
                <StorageImage
                  path={`images/${dish.id}.${dish.image}`}
                  className="dish-image"
                />
              )}
            </div>
            <div className="description">
              <h3 className="small-title">Description</h3>
              <textarea
                onChange={(e) =>
                  handleDishChange("description", e.target.value)
                }
                value={newDish.description || ""}
              ></textarea>
            </div>
          </div>
          <div className="weight-calories">
            <h3>Weight</h3>
            <div>
              <input
                type="text"
                onChange={(e) => handleDishChange("weight", e.target.value)}
                value={newDish.weight || ""}
              ></input>
              <h3>gr</h3>
            </div>
          </div>
          <div className="weight-calories">
            <h3>Calories</h3>
            <div>
              <input
                type="text"
                onChange={(e) => handleDishChange("calories", e.target.value)}
                value={newDish.calories || ""}
              ></input>
              <h3>kcal</h3>
            </div>
          </div>
          <h3 className="small-title">Ingredients</h3>
          {ingredients.map((ingredient, index) => (
            <div className="ingredient" key={index}>
              <input
                type="text"
                className="ingredient-name"
                placeholder="Ingredient name"
                value={ingredient.name || ""}
                onChange={(e) =>
                  handleIngredientChange(index, "name", e.target.value)
                }
              />
              <div className="quantity-unit">
                <input
                  type="text"
                  placeholder="quantity"
                  value={ingredient.quantity || ""}
                  onChange={(e) =>
                    handleIngredientChange(index, "quantity", e.target.value)
                  }
                />
                <input
                  type="text"
                  list="value-type"
                  placeholder="unit"
                  value={ingredient.unit || ""}
                  onChange={(e) =>
                    handleIngredientChange(index, "unit", e.target.value)
                  }
                />
                <datalist id="value-type">
                  <option>kg</option>
                  <option>gr</option>
                  <option>l</option>
                  <option>ml</option>
                  <option>pieces</option>
                </datalist>
                <button
                  className="delete-ingredient-button"
                  onClick={deleteIngredient(index)}
                >
                  <img src={minus}></img>
                </button>
              </div>
            </div>
          ))}
          <button className="add-ingredient-button" onClick={addIngredient}>
            <img src={plus}></img>
          </button>
          <h3 className="small-title">Recipe</h3>
          <textarea
            onChange={(e) => handleDishChange("recipe", e.target.value)}
            value={newDish.recipe || ""}
          ></textarea>
          <button className="new-dish-button done-button" type="submit">
            Done
          </button>
        </form>
      </div>
    </div>
  );
}

export default DishEditWindow;
