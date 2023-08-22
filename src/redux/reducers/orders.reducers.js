import { LIST_ORDER, LIST_ORDER_ID } from "../actionType";

const INIT_STATE = {
    cartId:[],
    cart:[],
    qtyDescount:[]
  };

  const OrdersReducers = (state = INIT_STATE, action) => {
    switch (action.type) {
        case LIST_ORDER:
            return { ...state, cart: action.payload}
        ;
        case LIST_ORDER_ID:
            return { ...state, cartId: [action.payload]}
        ;
        default:
      return state;
    }
}
export default OrdersReducers;