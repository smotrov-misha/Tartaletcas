import client from "./Client";

export const deleteDish = async (dish) => {
  const { data: rowsToDelete } = await dish.templates();
  for (const row of rowsToDelete) {
    await client.models.DishesTemplates.delete({
      id: row.id,
    });
  }
  await client.models.Dishes.delete({
    id: dish.id,
  });
};

export const editDish = async (dish) => {
  const { data: updatedDish } = await client.models.Dishes.update({
    name: dish.name,
    image: dish.image,
    description: dish.description,
    recipe: dish.recipe,
    weight: dish.weight,
    calories: dish.calories,
    ingredients: [...dish.ingredients],
    id: dish.id,
  });
};

export const createDish = async (dish) => {
  const { data: createdDish } = await client.models.Dishes.create({
    name: dish.name,
    image: dish.image,
    description: dish.description,
    recipe: dish.recipe,
    weight: dish.weight,
    calories: dish.calories,
    ingredients: [...dish.ingredients],
  });
};

export default createDish;
