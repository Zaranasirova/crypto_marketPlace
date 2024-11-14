import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCryptoData,
  setDisplayCoinData,
  setSearchValue,
} from "../redux/GlobalSlice";
import { AppDispatch, RootState } from "../redux/store";
import { Link } from "react-router-dom";

const Home = () => {
 
  const dispatch = useDispatch<AppDispatch>();

  const { displayCoinData, currencySymbol, selectedValue, cryptoData, searchValue} =
    useSelector((state: RootState) => state.global);
  const handleSearchValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    dispatch(setSearchValue(value));
    if (value.trim() === "") {
      dispatch(setDisplayCoinData(cryptoData));
    }
  };
  const handleSearchSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const filteredData = await displayCoinData.filter((item) =>
      item.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    dispatch(setDisplayCoinData(filteredData));
  };

  useEffect(() => {
    dispatch(getAllCryptoData(selectedValue));
  }, [dispatch, selectedValue]);

  useEffect(() => {
    const filteredData = cryptoData.filter((item) =>
      item.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    dispatch(setDisplayCoinData(filteredData));
  }, [cryptoData, searchValue, dispatch]);
  return (
    <section className="hero-section">
      <div className="head">
        <h1 className="hero-head-title">
          Largest <br />
          Crypto Marketplace
        </h1>
        <div className="text-wrapper">
          <p>Welcome to the world`s largest cryptocurrency marketplace.</p>
          <p>Sign up to explore more about cryptos.</p>
        </div>
        <form className="hero-form" onSubmit={handleSearchSubmit}>
          <input
            list="coinlist"
            type="text"
            placeholder="Search crypto.."
            value={searchValue}
            onChange={handleSearchValue}
            required
          />

          <datalist id="coinlist">
            {cryptoData.map((item) => (
              <option key={item.id} value={item.name} className="option"/>
            ))}
          </datalist>

          <button type="submit">Search</button>
        </form>
      </div>
      <div className="main-content">
        <div className="coinst-table-layout">
          <ul>
            <li>#</li>
            <li>Coins</li>
            <li>Price</li>
            <li style={{ textAlign: "center" }}>24H Change</li>
            <li style={{ textAlign: "right" }}>Market Cap</li>
          </ul>
          {displayCoinData.slice(0, 30).map((item) => (
            <Link to={`/coin/${item.id}`} key={item.id}>
              <ul>
                <li>{item.market_cap_rank}</li>
                <li
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <img src={item.image} alt={item.name} />
                  <p>{item.name + "-" + item.symbol}</p>
                </li>
                <li>
                  {currencySymbol.symbol}
                  {item.current_price.toLocaleString()}
                </li>
                <li
                  className={
                    item.price_change_percentage_24h > 0 ? "green" : "red"
                  }
                >
                  {Math.floor(item.price_change_percentage_24h * 100) / 100}
                </li>
                <li style={{ textAlign: "end" }}>
                  {currencySymbol.symbol}
                  {item.market_cap.toLocaleString()}
                </li>
              </ul>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Home;
