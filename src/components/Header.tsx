import React from "react";
import logo from "../assets/image/logo.png";
import { Link } from "react-router-dom";
import arrow from "../assets/image/arrow_icon.png";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { changeCurrency } from "../redux/GlobalSlice"; 
import { ChangeEvent } from "react";

const Header = () => {
  const { selectedValue} = useSelector(
    (state: RootState) => state.global
  );
  const dispatch = useDispatch(); 
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(changeCurrency(e.target.value)); 
  };
  return (
    <header className="header">
      <div className="container">
        <div className="header-wrapper">
          <div className="header-logo">
            <img src={logo} alt="logo-image" />
          </div>
          <nav className="navBar">
            <ul className="nav-list">
              <li>
                <Link to={"/"}>Home</Link>
              </li>
              <li>
                <Link to={"/"}>Fetures</Link>
              </li>
              <li>
                <Link to={"/"}>Pricing</Link>
              </li>
              <li>
                <Link to={"/"}>Blog</Link>
              </li>
            </ul>
          </nav>
          <div className="user-area">
            <select
              className="user-currency"
              value={selectedValue}
              onChange={handleSelectChange}
            >
              <option value="USD">USD</option>
              <option value="TRY">TRY</option>
              <option value="EUR">EUR</option>
              <option value="INR">INR</option>
            </select>
            <button className="sign-button">
              <span>Sign Up</span>
              <img src={arrow} alt="arrow-img" className="arrow-image" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
