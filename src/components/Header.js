import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <div className="header">
      <Link to="/">
        <h2>crypto tracker</h2>
      </Link>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/watched-coins">Watched Coins</Link>
          </li>
          <li>
            <Link to="/all-coins">All Coins</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
