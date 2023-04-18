import AxiosInstance from "../utils/axiosInstance";



//export const uploadImage =(data)=>API.post('/upload/',data)
export const uploadImage = async (data) => {
    try {
      const response = await AxiosInstance.post('/upload/', data);
      console.log(response);
  
      return response;
    } catch (e) {
      console.log(e);
      return;
    }
  };

  export const uploadPost = async (data) =>{
    try {
      const response = await AxiosInstance.post('/post', data);
      console.log(response);
  
      return response;
    } catch (e) {
      console.log(e);
      return;
    }
  }