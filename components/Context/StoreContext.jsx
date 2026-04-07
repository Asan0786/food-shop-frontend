import { createContext, useEffect } from "react";
import { useState } from "react";
import {fetchFoodList} from '../../Service/FoodService';
import axios from "axios";
import { addToCart, getCartData } from "../../Service/cartService";

export const   StoreContext = createContext(null);

export const StoreContextProvider = (props) => {

  const [foodList, setFoodList] = useState([]);
  const[token , setToken] = useState(null);

  const[quantities, setQuantities] = useState({}); // object type store like this

  //example
//   {
//    food1 : quantity 2
//    food2;: quantity 3;
//   }

 const increaseQuantities = async (foodId) => {
     setQuantities((prev) => ({...prev, [foodId]: (prev[foodId] || 0) + 1}));
      await addToCart(foodId,token);
 }

 const decreaseQuantites = (foodId) => {
      setQuantities((prev) => ({...prev, [foodId]: prev[foodId] > 0 ? prev[foodId]-1 : 0}));
      removeFromCart(foodId)
 }

 const removeFromCart = (foodId) => {
    setQuantities((prev) => {
       const updated = {...prev};
       delete updated[foodId];
       return updated;
    });
 }

 const loadCartData = async (token) => {
    const response =  await getCartData(token);
     // console.log(response);
      setQuantities(response.data.items);
 };

  const contextValue = {
     foodList,
     increaseQuantities,
     decreaseQuantites,
     quantities,
     removeFromCart,
     token,
     setToken,
     setQuantities,
     loadCartData
  };

  useEffect(()=> {
      async function loadData()  {
         const data = await fetchFoodList();
         setFoodList(data);
         //console.log(data);

         if(localStorage.getItem('token')){
            setToken(localStorage.getItem('token'));
            await loadCartData(localStorage.getItem('token'));
         }
      }
      loadData();
  }, []);


  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
}