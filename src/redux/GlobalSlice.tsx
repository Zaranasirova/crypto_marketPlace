import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";

export interface CryptoItem {
  id: string;
  name: string;
  image: string;
  market_cap: number;
  current_price: number;
  atl: number;
  high_24h: number;
  symbol: string;
  market_cap_change_24h:number;
  market_cap_rank:number;
}

export interface GlobalState {
  cryptoData: CryptoItem[];
  selectedValue: string;
  currencySymbol: { name: string; symbol: string };
}

const initialState: GlobalState = {
  cryptoData: [],
  selectedValue: "USD",
  currencySymbol: { name: "USD", symbol: "$" },
};

const getCurrencySymbol = (currency: string) => {
  switch (currency) {
    case "USD":
      return {
        name:"USD",
        symbol:"$"
      }
    case "EUR":
      return {
        name:"EUR",
        symbol:"€"
      };
    case "TRY":
      return {
        name:"TRY",
        symbol:"₺"
      };
    case "INR":
      return {
        name:"INR",
        symbol:"₹"
      };
    default:
      return {
        name:"Usd",
        symbol:"$"
      }
  }
};
export const getAllCryptoData = createAsyncThunk(
  "cryptoData",
async(currencySymbol:string)=>{
  const res= await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currencySymbol}`);
  console.log(res)
  return res.data;
}
);

export const counterSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    changeCurrency(state, action: PayloadAction<string>) {
      state.selectedValue = action.payload;
      state.currencySymbol = getCurrencySymbol(action.payload);
    },
  },
  extraReducers(builder) {
    builder.addCase(getAllCryptoData.fulfilled, (state, action) => {
      state.cryptoData = action.payload;
    });
  },
});

export const { changeCurrency } = counterSlice.actions;
export default counterSlice.reducer;
