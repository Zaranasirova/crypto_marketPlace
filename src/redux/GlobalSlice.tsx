import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface CryptoItem {
  id: string;
  name: string;
  image: string;
  market_cap: number;
  current_price: number;
  atl: number;
  high_24h: number;
  symbol: string;
  price_change_percentage_24h: number;
  market_cap_rank: number;
}
export interface CryptoSingleItem {
  id: string;
  name: string;
  symbol: string;
  image: {
    thumb: string;
    small: string;
    large: string;
  };
  market_data: {
    current_price: { [key: string]: number };
    market_cap: { [key: string]: number };
    high_24h: { [key: string]: number };
    low_24h: { [key: string]: number };
    price_change_percentage_24h: number;
    market_cap_rank: number;
  };
}
export interface CryptoHistoricalData {
  prices: [number, number][];
}




export interface GlobalState {
  cryptoData: CryptoItem[]; //umumi data statei
  selectedValue: string; //value deyeri saxlayan state
  currencySymbol: { name: string; symbol: string }; //seçili olan deyerin simvolunu və nameni saxlayan state
  searchValue: string; //search inputa daxil edilən dəyəri saxlayan state
  filteredCryptoData: CryptoItem | null; //search inputa daxil edilən dəyər ilə filter olunmuş datanı saxlayan stateş
  displayCoinData: CryptoItem[]; //filterolunmuş datani və umumi datani saxlamaq ucun olan arrayi saxlayan state
  singleData: CryptoSingleItem | null;
  loading: boolean;
  historicalData: CryptoHistoricalData | null;
 
}

const initialState: GlobalState = {
  cryptoData: [],
  selectedValue: "USD",
  currencySymbol: { name: "USD", symbol: "$" },
  searchValue: "",
  filteredCryptoData: null,
  displayCoinData: [],
  singleData: null,
  loading: false,
  historicalData: null,
 
};

const getCurrencySymbol = (currency: string) => {
  switch (currency) {
    case "USD":
      return {
        name: "USD",
        symbol: "$",
      };
    case "EUR":
      return {
        name: "EUR",
        symbol: "€",
      };
    case "TRY":
      return {
        name: "TRY",
        symbol: "₺",
      };
    case "INR":
      return {
        name: "INR",
        symbol: "₹",
      };
    default:
      return {
        name: "Usd",
        symbol: "$",
      };
  }
};
export const getAllCryptoData = createAsyncThunk(
  "cryptoData",
  async (currencySymbol: string) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-ZbRsxMJUHZ8aMJXtTxPTNTa8",
      },
    };

    const res = await axios.get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currencySymbol}`,
      options
    );

    return res.data;
  }
);
export const getSingleData = createAsyncThunk(
  "SingleData",
  async (currencySymbol: string) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "	CG-ZbRsxMJUHZ8aMJXtTxPTNTa8",
      },
    };

    const response = (
      await axios.get(
        `https://api.coingecko.com/api/v3/coins/${currencySymbol}`,
        options
      )
    ).data;
    return response;
  }
);
export const getAllHistoricalData = createAsyncThunk(
  "historicialData",
  async ({
    coinId,
    currencySymbol,
  }: {
    coinId: string;
    currencySymbol: string;
  }) => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': '	CG-ZbRsxMJUHZ8aMJXtTxPTNTa8'
      }
    };
    const historicialDataResponse = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currencySymbol}&days=10&interval=daily`,
      options
    );
    return historicialDataResponse.data;
  }
);

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    changeCurrency(state, action: PayloadAction<string>) {
      state.selectedValue = action.payload;
      state.currencySymbol = getCurrencySymbol(action.payload);
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setFilteredCryptoData(state, action: PayloadAction<CryptoItem[]>) {
      state.cryptoData = action.payload;
    },
    setDisplayCoinData(state, action: PayloadAction<CryptoItem[]>) {
      state.displayCoinData = action.payload;
    },
    setSingleData(state, action: PayloadAction<CryptoSingleItem>) {
      state.singleData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllCryptoData.fulfilled, (state, action) => {
      state.cryptoData = action.payload;
      state.displayCoinData = action.payload;
    });

    builder.addCase(getSingleData.fulfilled, (state, action) => {
      state.singleData = action.payload;
      state.loading = false;
    });

    builder.addCase(getAllHistoricalData.fulfilled, (state, action) => {
      state.historicalData = action.payload;
    });

    builder.addCase(getSingleData.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getSingleData.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const {
  changeCurrency,
  setSearchValue,
  setFilteredCryptoData,
  setDisplayCoinData,
  setSingleData,
} = globalSlice.actions;
export default globalSlice.reducer;
