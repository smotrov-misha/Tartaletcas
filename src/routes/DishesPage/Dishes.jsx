import React, { useState, useEffect } from "react";
import searchIcon from "../../assets/search.png";
import plus from "../../assets/plus.svg";
import "./Dishes.css";
import DishEditWindow from "../../components/DishEditWindow/DishEditWindow";
import Dish from "../../components/Dish/Dish";
import client from "../../backend/Client";

function Dishes() {
  const [newIsOpened, setNewIsOpened] = useState(false);
  const [search, setSearch] = useState("");
  const [currentSearch, setCurrentSearch] = useState("");
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    client.models.Dishes.observeQuery().subscribe({
      next: (data) => setDishes([...data.items]),
    });
  }, []);

  const openNewDish = () => {
    setNewIsOpened(true);
  };

  const closeNewDish = () => {
    setNewIsOpened(false);
  };

  const handleSearch = (e) => {
    setCurrentSearch(e.target.value);
  };

  const searchFor = () => {
    setSearch(currentSearch);
  };

  return (
    <>
      <div className="dishes-top-items">
        <div className="equal">
          <h1>Dishes</h1>
        </div>
        <div className="search">
          <input
            type="text"
            list="all-dishes"
            onChange={handleSearch}
            value={currentSearch || ""}
          />
          <datalist id="all-dishes">
            {dishes.map((dish) => (
              <option key={dish.id}>{dish.name}</option>
            ))}
          </datalist>
          <button className="search-button" onClick={searchFor}>
            <img src={searchIcon}></img>
          </button>
        </div>
        <div className="equal">
          <button className="add-button" onClick={openNewDish}>
            <img src={plus}></img>
          </button>
        </div>
      </div>
      {newIsOpened && <DishEditWindow closeNewDish={closeNewDish} />}
      {dishes.map((dish) => {
        if (
          search == dish.name.substring(0, search.length) ||
          search.length == 0
        ) {
          return <Dish dish={dish} key={dish.id} />;
        }
      })}
    </>
  );
}

export default Dishes;
