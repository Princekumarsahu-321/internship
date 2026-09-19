import { axiosInstance } from "../utils/axios";

export const getTripPlan = async (trip) => {
  const { data } = await axiosInstance.post("/trip/plan", trip);
  return data.data;
};
