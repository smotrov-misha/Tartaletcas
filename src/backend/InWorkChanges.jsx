import client from "./Client";

export const updateQuantityMade = async (id, quantityMade) => {
  await client.models.OrdersDishes.update({
    id: id,
    quantityMade: quantityMade,
  });
};

export const updatePercentage = async (dishes, itemId) => {
  const sumOfDishes = dishes.reduce(
    (acc, dish) => acc + Number(dish.quantity),
    0
  );
  const sumOfMadeDishes = dishes.reduce(
    (acc, dish) => acc + Number(dish.quantityMade),
    0
  );

  const percentage = ((sumOfMadeDishes / sumOfDishes) * 100).toFixed(2) + "%";

  await client.models.Orders.update({
    id: itemId,
    percents: percentage,
    isDone: percentage === "100.00%" ? true : false,
  });
};

export default updateQuantityMade;
