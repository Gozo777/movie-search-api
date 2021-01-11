import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

export default function NavBar() {
  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
        <ul className='nav-menu'>
        <li className='nav-item'>
        <NavLink exact to="/" activeStyle={{ color: "green" }}>
          <h1>Home</h1>
            </NavLink>
          </li>
          <li className='nav-item'>
        <NavLink to="/discover" activeStyle={{ color: "red" }}>
          <h1>Movie Details Search</h1>
          </NavLink>
            </li>
          </ul>
          </div>
          </nav>
    </>
  );
}