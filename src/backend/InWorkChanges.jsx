import client from "./Client";

export const updateQuantityMade = async (dishes) => {
  for (const dish of dishes) {
    await client.models.OrdersDishes.update({
      id: dish.id,
      quantityMade: dish.quantityMade,
    });
  }
};

export const updatePercentage = async (percentage, itemId) => {
  await client.models.Orders.update({
    id: itemId,
    percents: percentage,
    isDone: percentage === "100.00%" ? true : false,
  });
};

export const putToHistory = async (itemId) => {
  await client.models.Orders.update({
    id: itemId,
    isInHistory: true,
  });
};

export default updateQuantityMade;
