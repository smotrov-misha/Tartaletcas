import { useState, useEffect, useRef } from "react";
import dropArrow from "../../assets/drop_down_arrow.png";
import infoButton from "../../assets/infromation-button.png";
import Info from "../Info/Info";
import "./InWorkItem.css";
import InWorkDishes from "./InWorkDishes";
import { updatePercentage, putToHistory } from "../../backend/InWorkChanges";

function InWorkItem({ item }) {
  const { name, id, percents } = item;
  const [isDone, setIsDone] = useState(item.isDone);
  const [isExpanded, setIsExpanded] = useState(false);
  const allChecked = isDone;
  const [infoIsOpened, setInfoIsOpened] = useState(false);
  const [width, setWidth] = useState(percents);
  const widthRef = useRef(width);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      updatePercentage(widthRef.current, id);
      event.preventDefault();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    setWidth(percents);
  }, [percents]);

  useEffect(() => {
    widthRef.current = width;
    width === "100.00%" ? setIsDone(true) : setIsDone(false);
  }, [width]);

  useEffect(() => {
    return () => {
      updatePercentage(widthRef.current, id);
    };
  }, []);

  const expand = () => {
    setIsExpanded(!isExpanded);
  };

  const closeInfo = () => {
    setInfoIsOpened(false);
  };

  const openInfo = () => {
    updatePercentage(widthRef.current, id);
    setInfoIsOpened(true);
  };

  const itemIsDone = () => {
    updatePercentage(widthRef.current, id);
    putToHistory(id);
  };

  return (
    <>
      <div
        className="work-prep-item"
        style={isExpanded && allChecked ? { paddingBottom: "80px" } : {}}
      >
        <div className="work-prep-things">
          <div className="name-n-info">
            <h2 className="item-name">{name}</h2>
            <button onClick={openInfo}>
              <img src={infoButton}></img>
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
        <div className="full-progress">
          <div className="real-progress" style={{ width: width }}></div>
        </div>
        {isExpanded && <InWorkDishes itemId={id} setPercentage={setWidth} />}
        <button
          className="button-in-prep"
          style={{
            opacity: allChecked ? "1" : "0",
            transform: allChecked ? "scale(1)" : "scale(0)",
            bottom: isExpanded ? "20px" : "",
            top: isExpanded ? "" : "20px",
          }}
          onClick={itemIsDone}
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

export default InWorkItem;
