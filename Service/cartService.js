import axios from "axios";

const API_URL = 'http://localhost:8080/api/cart';


export const addToCart = (foodId, token) => {
  try{
    axios.post(API_URL,
      {foodId},
      {headers: {Authorization: `Bearer ${token}`}});

    }catch(error){
      console.error('something went wrong', error);
    }
};

export const removeFromCart = (foodId) => {
  try{
      axios.post('http://localhost:8080/api/cart/remove',
      {foodId},
      {headers: {Authorization: `Bearer ${token}`}});
  }catch(error){
    console.error('Please try again', error);
  }
}

export const getCartData = (token) => {
  try{
     const response =   axios.get('http://localhost:8080/api/cart',{
         headers: {Authorization: `Bearer ${token}`},
      });
      return response;
    }catch(error){
       console.error('something went wrong', error);
    }
}