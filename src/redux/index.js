import Cart from './reducers/cart.reducers';
import Customizer from './customizer/reducer';
import DrinksReducers from './reducers/drinks.reducers';
import Ecommerce from './reducers/products.reducers';
import Filters from './reducers/filters.reducers';
import LoginReducer from './reducers/login.reducers';
import OrdersReducers from './reducers/orders.reducers';
import Wishlist from './reducers/whishlist.reducers';
import {combineReducers} from 'redux'

const reducers = combineReducers({
    Customizer,
    data: Ecommerce,
    Wishlistdata: Wishlist,
    Cartdata: Cart,
    filters: Filters,
    drinks: DrinksReducers,
    order: OrdersReducers,
    login: LoginReducer
});

export default reducers;