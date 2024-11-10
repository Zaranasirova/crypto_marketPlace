import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCryptoData } from "../redux/GlobalSlice";
import { AppDispatch, RootState } from "../redux/store";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { cryptoData, currencySymbol } = useSelector(
    (state: RootState) => state.global
  );
  useEffect(()=>{
    dispatch(getAllCryptoData(currencySymbol))
  },[dispatch, currencySymbol]);
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
        <form className="hero-form">
          <input type="text" placeholder="Search crypto.." />
          <button type="submit">Search</button>
        </form>
      </div>
      <div className="main-content">
        <div className="coinst-table-layout">
          <ul>
            <li>#</li>
            <li>Coins</li>
            <li>Price</li>
            <li style={{textAlign:"center"}}>24H Change</li>
            <li style={{textAlign:"right"}}>Market Cap</li>
          </ul>
          {
            cryptoData.map(item=>(
              <ul key={item.id}>
                <li>{item.market_cap_rank}</li>
                <li style={{display:"flex",alignItems:"center", gap:"10px"}}><img src={item.image} alt={item.name}/><p>{item.name + "-" + item.symbol}</p></li>
                <li>{currencySymbol}{item.current_price.toLocaleString()}</li>
                <li style={{textAlign:"center"}}>{Math.floor(item.market_cap_change_24h*100)/100}</li>
                <li style={{textAlign:"end"}}>{currencySymbol}{item.market_cap.toLocaleString()}</li>
              </ul>
            ))
          }
        </div>
      </div>
    </section>
  );
};

export default Home;
