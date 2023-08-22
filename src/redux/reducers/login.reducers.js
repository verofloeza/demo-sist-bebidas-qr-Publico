import { DELETE_USER, GET_USER, SIGNIN, SIGNUP, UPDATE_USER } from '../actionType';

const INIT_STATE = {
    token: null,
    user: {},
  };

const LoginReducer = (state = INIT_STATE, action) => {
    switch(action.type){
        case SIGNUP:
            return {...state, token: action.token, user: action.user}
        case SIGNIN:
            return state
        case GET_USER:
            return {...state, user: action.payload}   
        case UPDATE_USER:
            return { ... state, user: action.user } 
        case DELETE_USER:
            return { ... state, user: {}, token: null } 
        default:
            return state
    }
}


export default LoginReducer;