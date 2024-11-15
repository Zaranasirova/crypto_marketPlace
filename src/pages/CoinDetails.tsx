import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../redux/store";
import { getAllHistoricalData, getSingleData } from "../redux/GlobalSlice";
import Loader from "./Loader";
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
    <section className="coin-details-section">
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
            <div className="coin-info">
              <ul>
                <li>Crypto Market Rank</li>
                <li>{singleData?.market_data?.market_cap_rank || "N/A"}</li>
              </ul>
              <ul>
                <li>Current Price</li>
                <li>
                  {currencySymbol.symbol}
                  {singleData?.market_data?.current_price[
                    currencySymbol.name.toLowerCase()
                  ].toLocaleString() || "N/A"}
                </li>
              </ul>
              <ul>
                <li>Market cap</li>
                <li>
                  {currencySymbol.symbol}
                  {singleData?.market_data?.market_cap[
                    currencySymbol.name.toLowerCase()
                  ].toLocaleString() || "N/A"}
                </li>
              </ul>
              <ul>
                <li>24 Hour high</li>
                <li>
                  {currencySymbol.symbol}
                  {singleData?.market_data?.high_24h[
                    currencySymbol.name.toLowerCase()
                  ].toLocaleString() || "N/A"}
                </li>
              </ul>
              <ul>
                <li>24 Hour low</li>
                <li>
                  {currencySymbol.symbol}
                  {singleData?.market_data?.low_24h[
                    currencySymbol.name.toLowerCase()
                  ].toLocaleString() || "N/A"}
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CoinDetails;
