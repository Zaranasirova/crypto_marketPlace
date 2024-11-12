import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../redux/store';
import { setSingleData } from '../redux/GlobalSlice';


const CoinDetails = () => {
  const {coinId}=useParams();
  const dispatch=useDispatch()

  const {cryptoData}=useSelector((state:RootState)=>state.global);
  const singleCryptoData=()=>{
    const getSingleCoinData=cryptoData.find((item)=>item.id===coinId)||null;
    dispatch(setSingleData(getSingleCoinData));
  }
  useEffect(()=>{
    singleCryptoData()
  },[cryptoData])

  return (
    <div>{coinId}</div>
  )
}

export default CoinDetails