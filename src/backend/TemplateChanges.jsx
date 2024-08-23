import client from "./Client";

export const addTemplate = async (newTemplate) => {
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

export const deleteTemplate = async (id, dishes) => {
  for (const dish of dishes) {
    await client.models.DishesTemplates.delete({
      id: dish.id,
    });
  }
  await client.models.Templates.delete({
    id: id,
  });
};

export const editTemplate = async (newTemplate, dishesInTemplate) => {
  await client.models.Templates.update({
    name: newTemplate.name,
    id: newTemplate.id,
  });
  for (const dish of dishesInTemplate) {
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

export const connectTemplateToDishes = async (newTemplate) => {
  const { data: dishes } = await newTemplate.dishes();
  const dishesWithNames = await Promise.all(
    dishes.map(async (dish) => {
      const {
        data: { name: name },
      } = await dish.dish();
      return { ...dish, name: name || "Unnamed Dish" };
    })
  );
  return dishesWithNames;
};

export default addTemplate;
