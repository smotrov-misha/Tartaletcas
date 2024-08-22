import InWorkSection from "../../components/InWorkSection/InWorkSection";
import PreparationSection from "../../components/PreparationSection/PreparationSection";
import TemplateSection from "../../components/TemplateSection/TemplateSection";
import client from "../../backend/Client";
import { useState, useEffect } from "react";

function Menus() {
  const [allItems, setAllItems] = useState([]);

  useEffect(() => {
    const subscriptionOrders = client.models.Orders.observeQuery({
      selectionSet: ["id", "name", "isDone", "prepared", "percents"],
    }).subscribe({
      next: ({ items }) => {
        setAllItems(items.map((item) => ({ ...item })));
      },
    });
    return () => {
      subscriptionOrders.unsubscribe();
    };
  }, []);

  return (
    <>
      <InWorkSection
        inWorkItems={allItems.filter((item) => item.prepared === true)}
      />
      <PreparationSection
        preparationItems={allItems.filter((item) => item.prepared === false)}
      />
      <TemplateSection />
    </>
  );
}

export default Menus;
