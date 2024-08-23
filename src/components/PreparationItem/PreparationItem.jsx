import { useState, useEffect } from "react";
import dropArrow from "../../assets/drop_down_arrow.png";
import infoButton from "../../assets/infromation-button.png";
import "./PreparationItem.css";
import "./Products";
import Products from "./Products";
import Info from "../Info/Info";
import { changeSection } from "../../backend/PreparationChanges";

function PreparationItem({ name, id, isDone }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [infoIsOpened, setInfoIsOpened] = useState(false);
  const allChecked = isDone;

  const expand = () => setIsExpanded(!isExpanded);
  const closeInfo = () => setInfoIsOpened(false);
  const openInfo = () => setInfoIsOpened(true);

  const chngSection = () => {
    changeSection(id);
  };

  return (
    <>
      <div
        className="work-prep-item prep-item"
        style={{
          paddingBottom: isExpanded
            ? allChecked
              ? "80px"
              : "20px"
            : allChecked
            ? "0px"
            : "0px",
        }}
      >
        <div className="work-prep-things">
          <div className="name-n-info">
            <h2 className="item-name">{name}</h2>
            <button onClick={openInfo}>
              <img src={infoButton} alt="Info" />
            </button>
          </div>
          <button
            id="arrow"
            onClick={expand}
            style={{
              transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
            }}
          >
            <img src={dropArrow} alt="Expand/Collapse" />
          </button>
        </div>
        {isExpanded && <Products itemId={id} />}
        <button
          className="button-in-prep"
          style={{
            opacity: allChecked ? "1" : "0",
            transform: allChecked ? "scale(1)" : "scale(0)",
            bottom: isExpanded ? "20px" : "",
            top: isExpanded ? "" : "20px",
          }}
          onClick={chngSection}
        >
          Done
        </button>
      </div>
      {infoIsOpened && (
        <Info closeInfo={closeInfo} id={id} unexpand={setIsExpanded} />
      )}
    </>
  );
}

export default PreparationItem;
