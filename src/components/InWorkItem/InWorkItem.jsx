function InWorkItem({ item, changeInWorkItems }) {
  const [checkmarks, setCheckmarks] = useState(
    new Array(item.dishes.length).fill(false)
  );
  const [allChecked, setAllChecked] = useState(false);

  const changeCheckmark = (i, val) => {
    const newCheckmarks = [...checkmarks];
    newCheckmarks[i] = val;
    for (let i = 0; i < newCheckmarks.length; i++) {
      if (newCheckmarks[i] == false && item.dishes[i].amount != 0) {
        setAllChecked(false);
        break;
      }
      if (i == newCheckmarks.length - 1) {
        setAllChecked(true);
      }
    }
    setCheckmarks(newCheckmarks);
  };

  const sumOfDishes = item.dishes.reduce((accumulator, dish) => {
    if (dish.amount != 0) return accumulator + Number(dish.amount);
    else return accumulator;
  }, 0);

  const [amountOfDishes, setAmountOfDishes] = useState(
    new Array(item.dishes.length).fill(0)
  );
  const [width, setWidth] = useState("0%");

  let sumOfAmountOfDishes = amountOfDishes.reduce((accumulator, amount) => {
    return accumulator + Number(amount);
  }, 0);

  let proportionProgressBar = sumOfAmountOfDishes / sumOfDishes;

  const changeDishAmount = (howManyMade, i) => {
    let newAmountOfDishes = [...amountOfDishes];
    let newSumOfAmountOfDishes =
      sumOfAmountOfDishes - Number(newAmountOfDishes[i]) + Number(howManyMade);
    let percentage = (newSumOfAmountOfDishes / sumOfDishes) * 100;
    newAmountOfDishes[i] = Number(howManyMade);
    setAmountOfDishes(newAmountOfDishes);
    setWidth(percentage + "%");
  };

  const [isExpanded, setIsExpanded] = useState(false);
  const expand = () => {
    setIsExpanded(!isExpanded);
  };

  const [infoIsOpened, setInfoIsOpened] = useState(false);

  const closeInfo = () => {
    setInfoIsOpened(false);
  };

  const openInfo = () => {
    setInfoIsOpened(true);
  };

  const itemIsDone = () => {
    item.toDo = "delete";
    changeInWorkItems(item);
  };

  return (
    <>
      <div
        className="work-prep-item"
        style={isExpanded && allChecked ? { paddingBottom: "80px" } : {}}
      >
        <div className="work-prep-things">
          <div className="name-n-info">
            <h2 className="item-name">{item.name}</h2>
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
        {isExpanded && (
          <>
            {item.dishes.map(
              (dish, i) =>
                dish.amount != 0 && (
                  <Dishinwork
                    key={dish.id}
                    index={i}
                    amount={dish.amount}
                    dishesMade={amountOfDishes[i]}
                    name={dish.name}
                    changeDishAmount={changeDishAmount}
                    changeCheckmark={changeCheckmark}
                    checkmark={checkmarks[i]}
                  />
                )
            )}
          </>
        )}
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
        <Info
          itemName={item.name}
          dishes={item.dishes}
          closeInfo={closeInfo}
          description={item.description}
          notes={item.notes}
          deadline={item.deadline}
          changePreparationItems={changeInWorkItems}
          id={item.id}
          prepared={item.prepared}
        />
      )}
    </>
  );
}

export default InWorkItem;
