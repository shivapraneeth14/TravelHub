import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  destination: '',
  dateFrom: '',
  dateTo: '',
};

const travelSlice = createSlice({
  name: 'travel',
  initialState,
  reducers: {
    setDestination: (state, action) => {
      state.destination = action.payload;
    },
    setDateFrom: (state, action) => {
      state.dateFrom = action.payload;
    },
    setDateTo: (state, action) => {
      state.dateTo = action.payload;
    },
  },
});

export const { setDestination, setDateFrom, setDateTo } = travelSlice.actions;

export const Travelreducer=  travelSlice.reducer;
