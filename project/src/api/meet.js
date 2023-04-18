import AxiosInstance from "../utils/axiosInstance";

export const createMeet = async (offerId, userId, values) => {
    const token = JSON.parse(localStorage.getItem("myData")).token;

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

  try {
    const response = await AxiosInstance.post(`/meet/${offerId}/${userId}`, values,config);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getMeetsOwner = async (ownerId) => {
  const token = JSON.parse(localStorage.getItem("myData")).token;

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

try {
  const response = await AxiosInstance.get(`/meet/owner/${ownerId}`,config);
  console.log(response);
  return response;
} catch (error) {
  console.log(error);
  return error;
}
};

export const getMeetsInvited = async (invitedId) => {
  const token = JSON.parse(localStorage.getItem("myData")).token;

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

try {
  const response = await AxiosInstance.get(`/meet/invited/${invitedId}`,config);
  console.log(response);
  return response;
} catch (error) {
  console.log(error);
  return error;
}
};