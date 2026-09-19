import { propertyDetailsAction } from "./propertyDetails-slice";
import { axiosInstance } from "../../utils/axios";

export const getPropertyDetails = (id) => async (dispatch) => {
  try {
    dispatch(propertyDetailsAction.getListRequest());

    const response = await axiosInstance.get(`/properties/${id}`);

    console.log("Property Details Response:", response.data);

    if (!response) {
      throw new Error("Could not fetch property");
    }

    dispatch(
      propertyDetailsAction.getPropertyDetails(response.data.data)
    );
  } catch (error) {
    console.log("Property Details Error:", error);

    dispatch(
      propertyDetailsAction.getErrors(
        error.response?.data?.message || error.message
      )
    );
  }
};