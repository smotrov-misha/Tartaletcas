import React, { useState } from "react";
import InWorkItem from "../InWorkItem/InWorkItem";

function InWorkSection() {
  const [inWorkItems, setInWorkItems] = useState([]);

  return (
    <>
      <h1 className="top-title">In work</h1>
      {inWorkItems.map(
        (item) =>
          item.prepared && (
            <InWorkItem
              key={item.id}
              item={item}
              changeInWorkItems={changeInWorkItems}
            />
          )
      )}
    </>
  );
}

export default InWorkSection;
