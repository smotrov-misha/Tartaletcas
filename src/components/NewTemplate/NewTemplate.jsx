import { useState, useEffect } from "react";
import client from "../../backend/Client";
import "./NewTemplate.css";
import cross_button from "../../assets/cross_button.png";
import {
  addTemplate,
  deleteTemplate,
  editTemplate,
} from "../../backend/TemplateChanges";

function NewTemplate({
  dishesInTemplate,
  templateName,
  mode,
  closeNewTemplate,
  id,
  setDishes,
}) {
  const [name, setName] = useState(templateName || "");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const [dishAmount, setDishAmount] = useState([]);

  useEffect(() => {
    const fetchDishNames = async () => {
      try {
        const { data: dishNames } = await client.models.Dishes.list({
          selectionSet: ["id", "name"],
        });

        let dishesWithQuantity = dishNames.map((dish) => ({
          ...dish,
          quantity: "",
        }));

        if (!dishesInTemplate) {
          setDishAmount(dishesWithQuantity);
        } else {
          dishesWithQuantity = dishesWithQuantity.map((dish) => {
            const found = dishesInTemplate.find(
              (dishWithQuantity) => dishWithQuantity.dishId === dish.id
            );
            return found ? { ...dish, quantity: found.quantity } : dish;
          });
          setDishAmount(dishesWithQuantity);
        }
      } catch (error) {
        console.error("Error fetching dishes:", error);
      }
    };

    fetchDishNames();
  }, []);

  const handleDishAmountChange = (e, index) => {
    const updatedDishAmount = [...dishAmount];
    updatedDishAmount[index].quantity = e.target.value.replace(/[^0-9]/g, "");
    setDishAmount(updatedDishAmount);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const realDishAmount = dishAmount.filter((dish) => dish.quantity != 0);
    if (mode === "Add") {
      if (!name) return alert("Type in template name");
      const newTemplate = { name: name, dishes: realDishAmount };
      addTemplate(newTemplate);
    } else if (mode === "Edit") {
      if (!name) return alert("Type in template name");
      const newTemplate = { name: name, dishes: realDishAmount, id: id };
      editTemplate(newTemplate, dishesInTemplate);
    } else if (mode === "New Order") {
      const tempDishes = realDishAmount.map((dish) => {
        return { ...dish, dishId: dish.id };
      });
      setDishes(tempDishes);
    }
    closeNewTemplate();
  };

  const delTemplate = () => {
    deleteTemplate(id, dishesInTemplate);
    closeNewTemplate();
  };
  return (
    <>
      <div className="overlay">
        <div
          className={
            mode === "New Order"
              ? "container-new-template edit-new-template"
              : "container container-new-template"
          }
          style={{
            backgroundColor:
              mode === "New Order" ? "#CBC8C4" : "rgba(0,0,0,0.1)",
          }}
        >
          <button
            className="cancel-button template-cancel-button"
            onClick={closeNewTemplate}
          >
            <img src={cross_button}></img>
          </button>
          <form onSubmit={handleSubmit}>
            {mode !== "New Order" && (
              <input
                type="text"
                placeholder="Template name"
                maxLength="20"
                className="new-template-name"
                onChange={handleNameChange}
                value={name}
              ></input>
            )}
            <div
              className="container-for-adding-dishes"
              style={{
                translate:
                  mode === "New Order" ? "0 calc(250px - 22.5vh)" : "0px 0px",
              }}
            >
              <>
                {dishAmount.map((dish, i) => (
                  <div className="chosen-dish" key={dish.id}>
                    <h3>{dish.name}</h3>
                    <input
                      type="text"
                      placeholder="0"
                      onChange={(e) => handleDishAmountChange(e, i)}
                      value={dishAmount[i].quantity || ""}
                    ></input>
                  </div>
                ))}
              </>
            </div>
            <button
              className="template-button done-template-button"
              type="submit"
            >
              Done
            </button>
          </form>
          {mode === "Edit" && (
            <button
              className="template-button delete-template-button"
              onClick={delTemplate}
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default NewTemplate;
