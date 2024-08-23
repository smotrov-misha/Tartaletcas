import { useEffect, useState } from "react";
import "./Template.css";
import NewTemplate from "../NewTemplate/NewTemplate";
import OrderEditWindow from "../OrderEditWindow/OrderEditWindow";
import client from "../../backend/Client";
import { connectTemplateToDishes } from "../../backend/TemplateChanges";

function Template({ template }) {
  const [editIsOpened, setEditIsOpened] = useState(false);
  const [startIsOpened, setStartIsOpened] = useState(false);
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    const fetchDishes = async () => {
      const subscriptionDishesTemplates =
        client.models.DishesTemplates.observeQuery().subscribe({
          next: async () => {
            const newDishes = await connectTemplateToDishes(template);
            setDishes(newDishes);
          },
        });

      return () => {
        subscriptionDishesTemplates.unsubscribe();
      };
    };

    fetchDishes();
  }, []);

  const openStart = () => {
    setStartIsOpened(true);
  };

  const closeStart = () => {
    setStartIsOpened(false);
  };

  const openEdit = () => {
    setEditIsOpened(true);
  };

  const closeEdit = () => {
    setEditIsOpened(false);
  };

  return (
    <>
      <div className="container-for-template">
        <h2 className="template-name">{template.name}</h2>
        <div className="template-dishes">
          {dishes.map((dish) => {
            return (
              <div className="template-dish-container" key={dish.id}>
                <h3>{dish.name}</h3>
                <h3>{dish.quantity}</h3>
              </div>
            );
          })}
        </div>
        <div className="template-buttons-container">
          <button className="template-button" onClick={openEdit}>
            Edit
          </button>
          <button className="template-button" onClick={openStart}>
            Start
          </button>
        </div>
      </div>
      {editIsOpened && (
        <NewTemplate
          closeNewTemplate={closeEdit}
          templateName={template.name}
          id={template.id}
          mode="Edit"
          dishesInTemplate={dishes}
        />
      )}
      {startIsOpened && (
        <OrderEditWindow
          closeNewOrder={closeStart}
          mode="Add"
          dishes={dishes}
        />
      )}
    </>
  );
}

export default Template;
