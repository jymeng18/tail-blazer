import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar-custom">
      <div className="navbar-container">
        <Link className="navbar-brand" to="/">
          TailBlazer
        </Link>
        <div className="navbar-links">
          <Link className="navbar-link" to="/">
            Home
          </Link>
          <Link className="navbar-link" to="/report">
            Report Lost Pet
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
