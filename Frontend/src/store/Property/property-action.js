// import { propertyAction } from "./property-slice.js";
// import { axiosInstance } from "../../utils/axios.js";

// export const getAllProperties =() => async (dispatch, getState) => {
//     try {
//       console.log("API call started");
      
//       dispatch(propertyAction.getRequest());

//       const { searchParams } =getState().properties;

//       console.log(searchParams);

//       const { data } = await axiosInstance.get("/properties",{
//           params: {...searchParams}
//         });

//         if(!data) {
//           throw new Error("could not fetch properties");
//         }

//         console.log(data);

//       dispatch(
//         propertyAction.getProperties(data)
//       );

//     } catch (error) {
//       dispatch(propertyAction.getErrors(error.message));
//     }
//   };

import { propertyAction } from "./property-slice.js";
import { axiosInstance } from "../../utils/axios.js";

export const getAllProperties = () => async (dispatch, getState) => {
  try {
    console.log("========== PROPERTY API ==========");

    dispatch(propertyAction.getRequest());

    const { searchParams } = getState().properties;

    console.log("Search params:", searchParams);

    const response = await axiosInstance.get("/properties", {
      params: { ...searchParams },
    });

    console.log("API URL:", response.config.url);
    console.log("API params:", response.config.params);
    console.log("API response:", response.data);

    if (!response.data) {
      throw new Error("Could not fetch properties");
    }

    dispatch(propertyAction.getProperties(response.data));

  } catch (error) {
    console.error("PROPERTY ERROR:", error);
    console.error("SERVER RESPONSE:", error.response?.data);

    dispatch(
      propertyAction.getErrors(
        error.response?.data?.message || error.message
      )
    );
  }
};

// export const getAllProperties =() => async (dispatch, getState) => {
//     try {
//       console.log("API call started");
      
//       dispatch(propertyAction.getRequest());

//       const { searchParams } =getState().properties;

//       console.log(searchParams);

//       const { data } = await axiosInstance.get("/properties",{
//           params: {...searchParams}
//         });

//         if(!data) {
//           throw new Error("could not fetch properties");
//         }

//         console.log(data);

//       dispatch(
//         propertyAction.getProperties(data)
//       );

//     } catch (error) {
//       dispatch(propertyAction.getErrors(error.message));
//     }
//   };