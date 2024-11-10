import React, { HtmlHTMLAttributes, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCryptoData, setFilteredCryptoData, setSearchValue } from "../redux/GlobalSlice";
import { AppDispatch, RootState } from "../redux/store";


const Home = () => {
  const { searchValue } = useSelector((state: RootState) => state.global);
 
  const dispatch = useDispatch<AppDispatch>();
  const { cryptoData, currencySymbol, selectedValue } = useSelector(
    (state: RootState) => state.global
  );
  const handleSearchValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchValue(event.target.value));
  };
  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 
    const filteredData = cryptoData.filter((item) =>
      item.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    dispatch(setFilteredCryptoData(filteredData));
  };


  useEffect(() => {
    dispatch(getAllCryptoData(selectedValue));
  }, [dispatch, selectedValue]);
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
            type="text"
            placeholder="Search crypto.."
            value={searchValue}
            onChange={handleSearchValue}
          />
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
          {cryptoData.slice(0, 30).map((item) => (
            <ul key={item.id}>
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
              <li style={{ textAlign: "center" }}>
                {Math.floor(item.market_cap_change_24h * 100) / 100}
              </li>
              <li style={{ textAlign: "end" }}>
                {currencySymbol.symbol}
                {item.market_cap.toLocaleString()}
              </li>
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Home;
