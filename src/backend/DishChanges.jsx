import client from "./Client";
import { uploadData } from "aws-amplify/storage";

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

export const editDish = async (dish, file) => {
  let imageExt;
  if(file){
    imageExt = file.name.split('.').pop()
    uploadData({
      path: `images/${dish.id}.${imageExt}`,
      data: file,
    });
  }
  console.log(imageExt)
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
  console.log(file);
};

export const createDish = async (dish, file) => {
  const { data: createdDish } = await client.models.Dishes.create({
    name: dish.name,
    description: dish.description,
    image: file.name.split('.').pop(),
    recipe: dish.recipe,
    weight: dish.weight,
    calories: dish.calories,
    ingredients: [...dish.ingredients],
  });
  uploadData({
    path: `images/${createdDish.id}.${createdDish.image}`,
    data: file,
  });
};

export default createDish;
