// import { axiosInstance } from "../../utils/axios.js";
// import {
//   setBookingDetails,
//   setBookings
// } from "./booking-slice.js";

// export const fetchUserBookings = () => async (dispatch) => {
//     try {

//       const response = await axiosInstance.get("/booking");
    
//       dispatch(setBookings(response.data.data.bookings));
//     } catch (error) {
//       console.error("Error fetching bookings:",error);

//     }
//   };


// export const fetchBookingDetails =(bookingId) => async (dispatch) => {
//     try {

//       const response = await axiosInstance.get(`/booking/${bookingId}`);
//       dispatch(setBookingDetails(response.data.data.booking));
//     } catch (error) {
//       console.error("Error fetching booking details:",error);    
//     }
//   };

import { axiosInstance } from "../../utils/axios.js";
import {
  setBookingRequest,
  setBookingDetails,
  setBookings
} from "./booking-slice.js";

export const fetchUserBookings = () => async (dispatch) => {
    try {
      dispatch(setBookingRequest());

      const response = await axiosInstance.get("/booking");
    
      dispatch(setBookings(response.data.data.bookings));
    } catch (error) {
      console.error("Error fetching bookings:",error);

    }
  };


export const fetchBookingDetails =(bookingId) => async (dispatch) => {
    try {

      const response = await axiosInstance.get(`/booking/${bookingId}`);
      dispatch(setBookingDetails(response.data.data.booking));
    } catch (error) {
      console.error("Error fetching booking details:",error);    
    }
  };