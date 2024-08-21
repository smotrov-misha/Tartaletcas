import client from "./Client";

export const deleteDish = async (dish) => {
  const { data: rowsToDelete } = await dish.templates();
  console.log(rowsToDelete);
  for (const row of rowsToDelete) {
    await client.models.DishesTemplates.delete({
      id: row.id,
    });
  }
  await client.models.Dishes.delete({
    id: dish.id,
  });
  //   const { data: ingredientsToDelete } = await client.models.Ingredients.list(
  //     {
  //       selectionSet: ["id"],
  //     },
  //     {
  //       filter: {
  //         dishId: {
  //           eq: id,
  //         },
  //       },
  //     }
  //   );
  //   for (const ingredient of ingredientsToDelete) {
  //     await client.models.Ingredients.delete({
  //       id: ingredient.id,
  //     });
  //   }
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
  //   const { data: ingredientsToDelete } = await client.models.Ingredients.list(
  //     {
  //       selectionSet: ["id"],
  //     },
  //     {
  //       filter: {
  //         dishId: {
  //           eq: dish.id,
  //         },
  //       },
  //     }
  //   );
  //   console.log(ingredientsToDelete);
  //   for (const ingredient of ingredientsToDelete) {
  //     await client.models.Ingredients.delete({
  //       id: ingredient.id,
  //     });
  //   }
  //   for (const ingredient of dish.ingredients) {
  //     await client.models.Ingredients.create({
  //       name: ingredient.name,
  //       quantity: ingredient.quantity,
  //       unit: ingredient.unit,
  //       dishId: dish.id,
  //     });
  //   }
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
