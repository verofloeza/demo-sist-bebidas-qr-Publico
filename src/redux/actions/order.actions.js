import { LIST_ORDER, LIST_ORDER_ID } from "../actionType";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";

import { db } from "../../data/firebase/firebase";

export const getOrder =(id)=>{
    return async dispatch => {
  
        const docRef = doc(db, "orders", id);
        const docSnap = await getDoc(docRef);
        const info = docSnap.data();
        const data ={
                user: info.user,
                product: info.product,
                date: info.date,
                isActive: info.isActive,
                total: info.total,
                qr: info.qr
              }
              dispatch({ 
                    type: LIST_ORDER_ID,
                    payload: data
                  });
      }
}

export const getordenes =(userF)=>{
  return async dispatch => {
      let info = []
      const docRef = await getDocs(
        query(
          collection(db, "orders"),
          where("user.email", "==", userF)
        )
      );
      docRef.forEach((doc) => {
        const data = doc.data()
        info.push({
            id: doc.id,
            data
          });
       
      });
      info.sort((a, b) => b.data.date - a.data.date);
      dispatch({ 
        type: LIST_ORDER,
        payload: info
      });
      
    }
}