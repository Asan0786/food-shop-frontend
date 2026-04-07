import axios from "axios";

const API_URL = 'http://localhost:8080/api';

export const resgisterUser = async (data) => {
     //call register api in backend
     try{
        const response = await axios.post(API_URL+"/register",data);
        return response;
     }catch(eror){
        toast.error("something went wrong")
     }
        
};

export const login = async(data) => {
    try{
      const respose = await axios.post(API_URL+"/login",data);
       return respose;
    }catch(error){
         throw error;
    }
}