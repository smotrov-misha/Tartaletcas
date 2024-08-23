import { useState, useEffect } from "react";
import client from "../../backend/Client";
import ProductInPreparation from "./ProductInPreparation";
import { updateCheckmarks } from "../../backend/PreparationChanges";

function Products({ itemId }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const subscriptionProducts = client.models.Orders.observeQuery({
      selectionSet: ["ingredients.*"],
      filter: {
        id: {
          eq: itemId,
        },
      },
    }).subscribe({
      next: ({ items }) => {
        setProducts(items[0].ingredients);
      },
    });
    return () => {
      subscriptionProducts.unsubscribe();
    };
  }, []);

  const changeCheckmark = (i, value) => {
    const newProducts = products.map((product) => ({ ...product }));
    newProducts[i].checkmark = value;
    updateCheckmarks(newProducts, itemId);
  };
  return (
    <>
      {products.map((product, i) => (
        <ProductInPreparation
          key={i}
          id={i}
          product={product}
          changeCheckmark={changeCheckmark}
        />
      ))}
    </>
  );
}

export default Products;
