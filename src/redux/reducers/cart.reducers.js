import { ADD_TO_CART, CANCELE_CART, DECREMENT_QTY, NEW_ORDEN, REMOVE_FROM_CART } from "../actionType";

const INIT_STATE = {
  productItems: [],
  products: [],
  cart: [],
  orderId: 0
};
export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const productId = action.payload.product.id;
      if (state.cart.findIndex((product) => product.id === productId) !== -1) {
        const cart = state.cart.reduce((cartAcc, product) => {
          // console.log(product)
          if (product.id === productId) {
            cartAcc.push({
              ...product,
              qty: action.payload.qty + 1,
              sum: product.price * (action.payload.qty + 1),
            }); // Increment qty
          } else {
            //console.log(product)
            cartAcc.push(product);
          }
          return cartAcc;
        }, []);

        return { ...state, cart };
      }
      console.log(action.payload)
      return {
        ...state,
        cart: [
          ...state.cart,
          {
            ...action.payload.product,
            qty: action.payload.qty,
            sum: action.payload.product.price * action.payload.qty,
          },
        ],
      };
      

    case DECREMENT_QTY:
      if (
        state.cart.findIndex((product) => product.id === action.payload.product.id) !==
        -1
      ) {
        const cart = state.cart.reduce((cartAcc, product) => {
          if (product.id === action.payload.product.id && product.qty > 1) {
            cartAcc.push({
              ...product,
              qty: product.qty - 1,
              sum: product.price * (product.qty - 1),
            }); // Decrement qty
          } else {
            cartAcc.push(product);
          }
          return cartAcc;
        }, []);

        return { ...state, cart };
      }

      return {
        ...state,
        cart: [
          ...state.cart,
          {
            ...action.product,
            qty: action.qty,
            sum: action.product.price * action.qty,
          },
        ],
      };

    case REMOVE_FROM_CART:
      return {
        cart: state.cart.filter((item) => item.id !== action.payload.product.id),
      };
    case NEW_ORDEN:
      return{
        ...state,
        orderId: action.orderId
      };
    case CANCELE_CART:
      return{
        ...state,
        cart: []
      }
    default:
      return state;
  }
};
