import React from "react";
import { Link as NavLink, useLocation } from "react-router-dom";

export default function Navbar() {
  let { pathname } = useLocation();
  return (
    <nav className="p-2 navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="d-flex justify-content-center navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink
              className={`nav-link ${
                pathname === "/schoolarships-list" ? "active" : ""
              }`}
              to="/schoolarships-list"
            >
              Listado de solicitudes
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={`nav-link ${
                pathname === "/request-schoolarship" ? "active" : ""
              }`}
              to="/request-schoolarship"
            >
              Llenar solicitud
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
