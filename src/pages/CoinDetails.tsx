import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../redux/store";
import { getSingleData } from "../redux/GlobalSlice";

const CoinDetails = () => {
  const { coinId } = useParams<{ coinId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const {singleData}=useSelector((state:RootState)=>state.global)

  useEffect(() => {
    if (coinId) {
      dispatch(getSingleData(coinId));
      console.log() // coinId async actiona ötürülür
    }
  }, [coinId, dispatch]);

  return (
  <img src={singleData?.image.large} alt="" />// coinId-ni ekranda göstəririk
  );
};

export default CoinDetails;
