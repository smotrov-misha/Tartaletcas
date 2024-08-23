import client from "./Client";

export const calculateProducts = async (dishes) => {
  const productObject = {};
  await Promise.all(
    dishes.map(async (dish) => {
      const {
        data: { ingredients: ingredients },
      } = await client.models.Dishes.get({ id: dish.dishId });
      ingredients.forEach((ingredient) => {
        const ingrQuantity = Number(ingredient.quantity);
        const dishQuantity = Number(dish.quantity);
        if (!productObject[ingredient.name]) {
          productObject[ingredient.name] = [
            dishQuantity * ingrQuantity,
            ingredient.unit,
          ];
        } else {
          productObject[ingredient.name][0] += dishQuantity * ingrQuantity;
        }
      });
    })
  );
  const entries = Object.entries(productObject);
  const arrayOfIngredients = entries.map(([key, value]) => ({
    name: key,
    quantity: value[0],
    unit: value[1],
    checkmark: false,
  }));
  return arrayOfIngredients;
};

export const createOrder = async (order) => {
  const ingredients = await calculateProducts(order.dishes);
  const { data: newOrder } = await client.models.Orders.create({
    name: order.name,
    description: order.description,
    notes: order.notes,
    deadline: order.deadline,
    prepared: false,
    isDone: false,
    ingredients: ingredients,
  });
  for (const dish of order.dishes) {
    await client.models.OrdersDishes.create({
      dishId: dish.dishId,
      orderId: newOrder.id,
      quantity: dish.quantity,
    });
  }
};

export const updateOrder = async (order) => {
  const { data: dishesToDelete } = await client.models.OrdersDishes.list({
    selectionSet: ["id"],
    filter: {
      orderId: {
        eq: order.id,
      },
    },
  });
  for (const dish of dishesToDelete) {
    await client.models.OrdersDishes.delete({ id: dish.id });
  }
  const ingredients = await calculateProducts(order.dishes);
  await client.models.Orders.update({
    id: order.id,
    name: order.name,
    description: order.description,
    notes: order.notes,
    deadline: order.deadline,
    prepared: order.prepared,
    isDone: false,
    ingredients: ingredients,
    percents: "0%",
  });
  for (const dish of order.dishes) {
    await client.models.OrdersDishes.create({
      dishId: dish.dishId,
      orderId: order.id,
      quantity: dish.quantity,
    });
  }
};

export const updateCheckmarks = async (ingredients, itemId) => {
  const isDone = ingredients.every((ingredient) => ingredient.checkmark);
  await client.models.Orders.update({
    id: itemId,
    isDone: isDone,
    ingredients: ingredients,
  });
};

export const connectInfoToDishes = async (dishes) => {
  const dishesWithNames = await Promise.all(
    dishes.map(async (dish) => {
      const {
        data: { name: name },
      } = await client.models.Dishes.get({ id: dish.dishId });
      return { ...dish, name: name || "Unnamed Dish" };
    })
  );
  return dishesWithNames;
};

export const changeSection = async (id) => {
  await client.models.Orders.update({
    id: id,
    prepared: true,
    isDone: false,
  });
};

export default createOrder;
