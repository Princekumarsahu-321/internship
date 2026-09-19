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

export const getAllProperties =() => async (dispatch, getState) => {
    try {
      console.log("API call started");
      
      dispatch(propertyAction.getRequest());

      const { searchParams } =getState().properties;

      console.log(searchParams);

      const { data } = await axiosInstance.get("/properties",{
          params: {...searchParams}
        });

        if(!data) {
          throw new Error("could not fetch properties");
        }

        console.log(data);

      dispatch(
        propertyAction.getProperties(data)
      );

    } catch (error) {
      dispatch(propertyAction.getErrors(error.message));
    }
  };