import {
  ADD_TO_CART,
  GET_LIST,
  GET_SINGLE_ITEM
} from "../actionType";
import { collection, getDocs, query, where } from "firebase/firestore";

import { db } from "../../data/firebase/firebase";

export const getSingleItem = (productId) => ({
    type: GET_SINGLE_ITEM,
    payload: { productId },
  });
  
  export const addToCart = (product, qty) => (dispatch) => {
    dispatch(addToCartUnsafe(product, qty));
  };
  
  export const addToCartUnsafe = (product, qty) => ({
    type: ADD_TO_CART,
    payload: { product, qty },
  });

  export const listProducts = () =>{
    return async dispatch => {
      const list = [];
      const querySnapshot = await getDocs(query(collection(db, "drinks"), where("isActive", "==", true)));
      querySnapshot.forEach((doc) => {
        let info = doc.data();
        list.push({
            id: doc.id,
            title: info.title,
            description: info.description,
            price: info.price,
            image:  <img src={info.image} alt="" />
          });
      });

      dispatch({ 
          type: GET_LIST,
          payload: list
        });
      
    }
  }
  
  
  