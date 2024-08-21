import { useState, useEffect, useMemo, useRef } from "react";
import dropArrow from "./assets/drop_down_arrow.png";
import infoButton from "./assets/infromation-button.png";
import Info from "./Info";
import _ from "lodash";
import client from "./Client.jsx";

function ProductInPreparation(props) {
  const { name, amount, checkValue, index, changeCheckmark } = props;
  const [checked, setChecked] = useState(checkValue);

  const handleCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    changeCheckmark(index, isChecked);
    setChecked(isChecked);
  };

  useEffect(() => {
    setChecked(checkValue);
  }, [checkValue]);

  return (
    <div className="product-in-prep">
      <h3 className="product-name-in-prep">{name}</h3>
      <div className="how-many-product">
        <h3>{amount}</h3>
        <label className="check-product">
          <input
            type="checkbox"
            onChange={handleCheckboxChange}
            checked={checked}
          />
          <span className="checkmark"></span>
        </label>
      </div>
    </div>
  );
}

function PreparationItem({ item, changePreparationItems, changePage }) {
  const fullItemCopy = _.cloneDeep(item);
  const [updatedItem, setUpdatedItem] = useState(_.cloneDeep(fullItemCopy));
  const { prepared, name } = item;
  const [isExpanded, setIsExpanded] = useState(false);
  const [infoIsOpened, setInfoIsOpened] = useState(false);
  const [products, setProducts] = useState(
    fullItemCopy.products ? fullItemCopy.products : []
  );
  const [checkmarks, setCheckmarks] = useState(
    fullItemCopy.checkmarks ? fullItemCopy.checkmarks : []
  );
  const [allChecked, setAllChecked] = useState(
    fullItemCopy.allChecked || false
  );
  const [dishes, setDishes] = useState([]);

  const expand = () => setIsExpanded(!isExpanded);
  const closeInfo = () => setInfoIsOpened(false);
  const openInfo = () => setInfoIsOpened(true);

  const findDishName = async (dish) => {
    const { data: dishName, errors } = await client.models.Dishes.get({
      id: dish.dishId,
    });
    console.log(dishName);
    return dishName.name;
  };

  useEffect(() => {
    const fetchDishNames = async (dishes) => {
      const updatedDishes = await Promise.all(
        dishes.map(async (dish) => ({
          ...dish,
          name: await findDishName(dish),
        }))
      );
      setDishes(updatedDishes);
    };

    const fetchDishes = async () => {
      const { data: updatedDishes } = await client.models.OrdersDishes.list({
        filter: {
          orderId: {
            eq: item.id,
          },
        },
      });
      await fetchDishNames(updatedDishes);
    };

    fetchDishes();
  }, []);

  const calculateProducts = () => {
    const productObject = {};
    dishes.forEach((dish) => {
      if (dish.amount !== 0) {
        dish.ingredients.forEach((ingredient) => {
          const quantity = Number(ingredient.quantity);
          const amount = Number(dish.amount);
          if (!productObject[ingredient.name]) {
            productObject[ingredient.name] = [
              amount * quantity,
              ingredient.unit,
            ];
          } else {
            productObject[ingredient.name][0] += amount * quantity;
          }
        });
      }
    });
    const entries = Object.entries(productObject);
    const arrayOfProducts = entries.map(([key, value]) => ({
      name: key,
      quantity: value[0],
      unit: value[1],
    }));
    return arrayOfProducts;
  };

  const newProducts = useMemo(calculateProducts, [item.dishes]);

  useEffect(() => {
    setProducts(newProducts);
    if (
      updatedItem.products &&
      updatedItem.checkmarks &&
      updatedItem.allChecked &&
      _.isEqual(updatedItem.products, newProducts)
    ) {
      setCheckmarks(updatedItem.checkmarks);
      setAllChecked(updatedItem.allChecked);
    } else {
      setCheckmarks(new Array(newProducts.length).fill(false));
      setAllChecked(false);
      const newItem = {
        ...item,
        checkmarks: new Array(newProducts.length).fill(false),
        allChecked: false,
        toDo: "edit",
        products: newProducts,
      };
      setUpdatedItem(newItem);
      changePreparationItems(newItem);
    }
  }, [item.dishes]);

  const changeCheckmark = (i, val) => {
    const newCheckmarks = [...checkmarks];
    newCheckmarks[i] = val;
    setCheckmarks(newCheckmarks);
    const allCheckedFlag = newCheckmarks.every((checked, index) => {
      return checked;
    });
    const newItem = {
      ...item,
      checkmarks: [...newCheckmarks],
      allChecked: allCheckedFlag,
      toDo: "checkmarks",
    };
    setUpdatedItem(newItem);
    changePreparationItems(newItem);
    setAllChecked(allCheckedFlag);
  };

  const changeSection = () => {
    const newItem = { ...item };
    newItem.toDo = "prep->inwork";
    changePreparationItems(newItem);
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
        {isExpanded &&
          products.map((product, i) => (
            <ProductInPreparation
              key={i}
              index={i}
              amount={`${product.quantity} ${product.unit}`}
              name={product.name}
              checkValue={checkmarks[i]}
              changeCheckmark={changeCheckmark}
            />
          ))}
        <button
          className="button-in-prep"
          style={{
            opacity: allChecked ? "1" : "0",
            transform: allChecked ? "scale(1)" : "scale(0)",
            bottom: isExpanded ? "20px" : "",
            top: isExpanded ? "" : "20px",
          }}
          onClick={changeSection}
        >
          Done
        </button>
      </div>
      {infoIsOpened && (
        <Info
          itemName={item.name}
          dishes={dishes}
          closeInfo={closeInfo}
          description={item.description}
          notes={item.notes}
          deadline={item.deadline}
          changePreparationItems={changePreparationItems}
          id={item.id}
          prepared={item.prepared}
        />
      )}
    </>
  );
}

export default PreparationItem;
