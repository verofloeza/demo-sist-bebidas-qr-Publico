import { GET_USER, SIGNIN, SIGNUP, UPDATE_USER } from '../actionType';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

import { db } from '../../data/firebase/firebase';

export const signup = (nombre, telefono, email) => {
    return async dispatch => {
        const userRef = doc(db, "Users", email);
        const user = {
            name: nombre,
            email: email,
            phone: telefono,
            role: 'cliente',
            isActive: true
            };
        try {
            await setDoc(userRef, user);
            dispatch({ 
                type: SIGNUP,
                user: user
            })
        } catch (e) {
            console.error("Error al agregar usuario a Firestore:", e);
        }
    }
}
export const getUser = (email) => {
    return async dispatch => {
        const docRef = doc(db, "Users", email);
        const docSnap = await getDoc(docRef);
        const info = docSnap.data();

              dispatch({ 
                    type: GET_USER,
                    payload: info
                  });
    }
}

export const updateUser = (nombre, telefono, email) => {
    return async dispatch => {
        
        const userRef = doc(db, "Users", email);
        const user = {
            name: nombre,
            email: email,
            phone: telefono
            };
        try {
            await updateDoc(userRef, user);
            dispatch({ 
                type: UPDATE_USER,
                user: user
            })
        } catch (e) {
            console.error("Error al agregar usuario a Firestore:", e);
        }
    }
}
