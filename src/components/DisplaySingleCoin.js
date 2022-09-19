import React, { useState, useEffect } from "react";
import calculatePercent from "./calculatePercent";
import axios from "axios";
import "./DisplaySingleCoin.css";

function DisplaySingleCoin({
  coin,
  type,
  addCoin,
  editCoin,
  deleteItem,
  closeSetItem,
  BASE_URL,
}) {
  const [price, setPrice] = useState(0);
  const [target, setTarget] = useState(0);
  const [targetNotification, setTargetNotification] = useState("");
  const [priceNotification, setPriceNotification] = useState("");
  const [editedTarget, setEditedTarget] = useState(0);
  const [distancePercent, setDistancePercent] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleAddClick() {
    validateTarget(target);
  }

  function handleKeyDownAdd(e) {
    if (e.key === "Enter") {
      validateTarget(target);
    }
  }

  function handleKeyDownEdit(e) {
    if (e.key === "Enter") {
      validateTarget(editedTarget);
    }
  }

  function handleEdit() {
    validateTarget(editedTarget);
  }

  function validateTarget(validationTarget) {
    if (validationTarget <= 0 || isNaN(validationTarget)) {
      setTargetNotification("Set correct target");
    } else {
      if (editMode) {
        editCoin(coin.id, validationTarget);
        setEditMode(false);
        setTargetNotification("");
      } else {
        addCoin(coin, validationTarget);
        setTargetNotification("");
      }
    }
  }

  useEffect(() => {
    const getCoinPrice = async (coinName) => {
      try {
        setPriceNotification("");
        setLoading(true);
        const currency = "usd";

        let coinNameReplaced = "";

        coinNameReplaced = coinName.replaceAll(" ", "-");
        coinNameReplaced = coinNameReplaced.replaceAll(".", "-");

        const res = await axios.get(
          `${BASE_URL}/simple/price?ids=${coinNameReplaced}&vs_currencies=${currency}`
        );
        const data = await res.data;
        const {
          [coinNameReplaced]: { [currency]: price },
        } = data;
        setPrice(price);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setPriceNotification(
          "Something went wrong. Please, refresh or try again later."
        );
      }
    };
    getCoinPrice(coin.name);
    const interval = setInterval(() => {
      getCoinPrice(coin.name);
    }, 60000);

    return clearInterval(interval);
  }, [BASE_URL, coin.name]);

  useEffect(() => {
    if (editMode) {
      setEditedTarget(coin.priceTarget);
    }
  }, [coin.priceTarget, editMode]);

  useEffect(() => {
    setDistancePercent(calculatePercent(price, coin.priceTarget));
  }, [price, editMode, coin.priceTarget]);

  return (
    <div className="DisplaySingleCoin">
      <div
        className={`itemBox ${
          type === "add"
            ? "itemBoxAddMod"
            : distancePercent >= 0
            ? "targetHitted"
            : ""
        }`}
      >
        <div className={`infoBox ${type === "add" && "infoBoxAdd"}`}>
          <div>
            {type === "list" ? "" : <p className="label">Name</p>}
            <p className="coin-name">{coin.name}</p>
          </div>
          <div>
            {type === "list" ? "" : <p className="label">Price</p>}
            {loading ? <p>Is loading...</p> : <p>{price}$</p>}
            {priceNotification && (
              <p className="priceNotification">{priceNotification}</p>
            )}
          </div>
          <div>
            {type === "list" ? "" : <p className="label">Price target</p>}
            {type === "list" && !editMode && <p>{coin.priceTarget}$</p>}
            {type === "add" && (
              <>
                <input
                  type="number"
                  onChange={(e) => setTarget(parseFloat(e.target.value))}
                  onKeyDown={handleKeyDownAdd}
                  onFocus={() => setTargetNotification("")}
                  className="target-input"
                />
                {targetNotification && (
                  <p className="targetNotification">{targetNotification}</p>
                )}
              </>
            )}
            {editMode && (
              <>
                <input
                  type="number"
                  value={editedTarget}
                  onChange={(e) => setEditedTarget(parseFloat(e.target.value))}
                  onKeyDown={handleKeyDownEdit}
                  className="target-input"
                />
                {targetNotification && (
                  <p className="targetNotification">{targetNotification}</p>
                )}
              </>
            )}
          </div>
          <div>{type === "list" && <p>{distancePercent}%</p>}</div>
        </div>
        <div className="buttonBox">
          {type === "add" && (
            <button className="button" onClick={handleAddClick}>
              Add
            </button>
          )}
          {type === "list" && !editMode && (
            <button className="button" onClick={() => setEditMode(true)}>
              Edit
            </button>
          )}
          {editMode && (
            <button
              className="button"
              data-coin-id={coin.id}
              onClick={handleEdit}
            >
              Save
            </button>
          )}
          {type === "list" && !editMode && (
            <button className="button" onClick={() => deleteItem(coin.id)}>
              Delete
            </button>
          )}
          {type === "add" && (
            <button className="button" onClick={closeSetItem}>
              &times;
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default DisplaySingleCoin;
