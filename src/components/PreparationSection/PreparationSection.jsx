import { useState } from "react";

function PreparationSection() {
  const [preparationItems, setPreparationItems] = useState([]);
  return (
    <>
      <h1 className="title">Preparation</h1>
      <>
        {preparationItems.map((prepItem) =>
          !prepItem.prepared ? (
            <PreparationItem
              key={prepItem.id}
              item={prepItem}
              changePreparationItems={changePreparationItems}
            />
          ) : null
        )}
      </>
    </>
  );
}

export default PreparationSection;
