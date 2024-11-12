import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../redux/store';
import { setSingleData } from '../redux/GlobalSlice'


const CoinDetails = () => {
  const {coinId}=useParams();
  const dispatch=useDispatch();
  

  const {cryptoData,singleData,selectedValue}=useSelector((state:RootState)=>state.global);
  const singleCryptoData=()=>{
    const getSingleCoinData=cryptoData.find((item)=>item.id===coinId)||null;
    dispatch(setSingleData(getSingleCoinData));
    console.log(singleData)
  }
  useEffect(()=>{
    singleCryptoData()
  },[cryptoData,selectedValue])

  return (
    <div>{singleData?.current_price}{selectedValue}</div>
  )
}

export default CoinDetails