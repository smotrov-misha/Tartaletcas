import client from "./Client";
import { uploadData } from "aws-amplify/storage";
import { remove } from "aws-amplify/storage";

export const deleteDish = async (dish) => {
  await remove({
    path: `images/${dish.id}.${dish.image}`,
  });
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

export const editDish = async (dish, file) => {
  let imageExt;
  if (file) {
    await remove({
      path: `images/${dish.id}.${dish.image}`,
    });

    imageExt = file.name.split(".").pop();
    uploadData({
      path: `images/${dish.id}.${imageExt}`,
      data: file,
    });
  }

  const { data: updatedDish } = await client.models.Dishes.update({
    name: dish.name,
    image: file ? imageExt : dish.image,
    description: dish.description,
    recipe: dish.recipe,
    weight: dish.weight,
    calories: dish.calories,
    ingredients: [...dish.ingredients],
    id: dish.id,
  });
};

export const createDish = async (dish, file) => {
  const { data: createdDish } = await client.models.Dishes.create({
    name: dish.name,
    description: dish.description,
    image: file ? file.name.split(".").pop() : "",
    recipe: dish.recipe,
    weight: dish.weight,
    calories: dish.calories,
    ingredients: [...dish.ingredients],
  });
  await uploadData({
    path: `images/${createdDish.id}.${createdDish.image}`,
    data: file,
  });
};

export default createDish;
