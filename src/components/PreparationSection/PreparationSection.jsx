import { useState, useEffect } from "react";
import PreparationItem from "../PreparationItem/PreparationItem";
import client from "../../backend/Client";

function PreparationSection({ preparationItems }) {
  return (
    <>
      <div>
        <h1 className="title">Preparation</h1>
        <>
          {preparationItems.map((prepItem) => (
            <PreparationItem
              id={prepItem.id}
              key={prepItem.id}
              name={prepItem.name}
              isDone={prepItem.isDone}
            />
          ))}
        </>
      </div>
    </>
  );
}

export default PreparationSection;
