import AxiosInstance from "../utils/axiosInstance";
export const login = async (values) => {
  try {
    const response = await AxiosInstance.post("/auth/signIn", values);
    console.log(response);

    return response;
  } catch (e) {
    console.log(e);
    return;
  }
};
export const registerUser = async (values) => {
  try {
    const response = await AxiosInstance.post("/auth/user", values);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const registerCompany = async (values) => {
  try {
    const response = await AxiosInstance.post("/auth/company", values, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const registerExpert = async (values) => {
  try {
    const response = await AxiosInstance.post("/auth/expert", values, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const UpdateProfile = async (id,values) => {
  const token = JSON.parse(localStorage.getItem("myData")).token;

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    const response = await AxiosInstance.put(`/user/${id}`, values, config);
    console.log(response);
    const user = JSON.parse(localStorage.getItem("myData")).user;
    const data = { token: token, user: { ...user, ...response.data } };
    localStorage.setItem("myData", JSON.stringify(data));
    return response.data;
  } catch (error) {
    console.log(error);
    return;
  }
};
