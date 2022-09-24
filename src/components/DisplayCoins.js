import { useContext } from "react";
import AppContext from "../context/AppContext";
import Table from "./Table";
import "./DisplayCoins.css";

function DisplayCoins({ toDisplay, type }) {
  return (
    <div>
      <div className="coins-list">
        <Table type={type} toDisplay={toDisplay} />
      </div>
    </div>
  );
}

export default DisplayCoins;
