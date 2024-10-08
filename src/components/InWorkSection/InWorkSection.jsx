import React, { useState, useEffect } from "react";
import InWorkItem from "../InWorkItem/InWorkItem";
import client from "../../backend/Client";

function InWorkSection({ inWorkItems }) {
  return (
    <>
      <div>
        <h1 className="top-title">In work</h1>
        {inWorkItems.map((item) => (
          <InWorkItem key={item.id} item={item} />
        ))}
      </div>
    </>
  );
}

export default InWorkSection;
