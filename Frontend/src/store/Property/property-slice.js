import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  properties: [],
  totalProperties: 0,

  searchParams: {
    page: 1,
    limit: 12,
  },

  error: null,
  loading: false,
};

const propertySlice = createSlice({
  name: "properties",

  initialState,

  reducers: {
    getRequest(state) {
      state.loading = true;
      state.error = null;
    },

    getProperties(state, action) {
      state.properties = action.payload.data;
      state.totalProperties = action.payload.total ?? action.payload.no_of_responses;
      state.loading = false;
    },

    updateSearchParams:(state, action)=> {
      state.searchParams = Object.keys(action.payload).length === 0 ?{}: {
        ...state.searchParams,
        ...action.payload,
      }
    },

    getErrors(state, action) {
      state.error = action.payload;

    },
  },
});

export const propertyAction =propertySlice.actions;
export default propertySlice;