import { useContext , useEffect} from "react";
import { NavLink } from "react-router-dom";

export const Navbar = () => {

  return (
    <nav className="navbar navbar-expand-lg navbar-dark py-3" style={{ backgroundColor: "#2c3e50" }}>
      <div className="container-fluid">
        <span className="navbar-brand" style={{ color: "#f8f9fa" }}>HK</span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle Navigation"
        >
          <span className="navbar-toggler-icon" style={{ backgroundColor: "#f8f9fa" }}></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/dashboard" style={{ color: "#f8f9fa" }}>Home</NavLink>
            </li>
          </ul>

          <ul className="navbar-nav ms-auto">
          
            <li className="nav-item m-1">
            <NavLink className="btn btn-outline-light" to="/shopping_cart">
                <i className="fas fa-shopping-cart me-2"></i> Shopping Cart
            </NavLink>
            </li>
            
          </ul>
        </div>
      </div>
    </nav>
  );
};