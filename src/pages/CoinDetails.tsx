import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../redux/store";
import { getAllHistoricalData, getSingleData } from "../redux/GlobalSlice";
import Loader from "./Loader";
import axios from "axios";

const CoinDetails = () => {
  const { coinId } = useParams<{ coinId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { singleData, currencySymbol, loading, historialData } = useSelector(
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

  const price =
    singleData?.market_data?.current_price?.[currencySymbol.name.toLowerCase()];

  

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
          </div>
        </div>
      )}
    </section>
  );
};

export default CoinDetails;
