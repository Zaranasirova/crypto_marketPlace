import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../redux/store";
import { getAllHistoricalData, getSingleData } from "../redux/GlobalSlice";
import Loader from "./Loader";
import axios from "axios";
import LineCharts from "../components/LineCharts";

const CoinDetails = () => {
  const { coinId } = useParams<{ coinId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { singleData, currencySymbol, loading } = useSelector(
    (state: RootState) => state.global
  );

  useEffect(() => {
    if (coinId) {
      dispatch(getSingleData(coinId));
      dispatch(
        getAllHistoricalData({ coinId, currencySymbol: currencySymbol.name })
      );
    }
  }, [coinId, dispatch, currencySymbol.name]);

console.log(singleData);

  return (
    <section>
      {loading ? (
        <Loader />
      ) : (
        <div className="container">
          <div className="coin-details">
            <div className="coin-head">
              {singleData?.image?.large && (
                <img src={singleData.image.large} alt={singleData.name} />
              )}
              <p>
                {singleData?.name} ({singleData?.symbol?.toUpperCase()})
              </p>
            </div>
            <div className="coin-chart">
              <LineCharts />
            </div>
            <div className="coin-end">
              <ul>
                <li>Crypto Market Rank</li>
                <li>{singleData?.market_data.market_cap_rank}</li>
              </ul>
              <ul>
                <li>Current Price</li>
                {/* <li>{currencySymbol.symbol}{singleData?.market_data.current_price}</li> */}
              </ul>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CoinDetails;
