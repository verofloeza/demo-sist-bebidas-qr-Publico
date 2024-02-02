import Barra from "../component/barra/barra";
import Cart from "../component/barra/cart";
import Checkout from "../component/barra/checkout";
import Pagos from "../component/barra/pagos";
import Pedidos from "../component/barra/pedidos";
import Productpage from "../component/barra/productpage";
import Qr from "../component/barra/qr";
import React from "react";
import Soporte from "../component/barra/soporte";

export const routes = [
    { path:`${process.env.PUBLIC_URL}/bebidas/:evento`, Component: <Barra/> }, 
    { path:`${process.env.PUBLIC_URL}/bebidas/bebidasDetalle/:id`, Component: <Productpage/> }, 
    { path:`${process.env.PUBLIC_URL}/carrito`, Component: <Cart/> },
    { path:`${process.env.PUBLIC_URL}/checkout`, Component: <Checkout/> },
    { path:`${process.env.PUBLIC_URL}/qr/:evento/:email`, Component: <Qr/> },
    { path:`${process.env.PUBLIC_URL}/pagos/:condition/:email/:id`, Component: <Pagos/> },
    { path:`${process.env.PUBLIC_URL}/pedidos`, Component: <Pedidos/> },
    // { path:`${process.env.PUBLIC_URL}/soporte`, Component: <Soporte/> },
]

