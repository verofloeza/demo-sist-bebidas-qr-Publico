import React from "react";
export const MENUITEMS = [
  {
    title: "Bebidas",
    icon: <i className="pe-7s-note2"></i>,
    path: "/bebidas/bebidas",
    type: "sub",
    active: true,
    bookmark: true,
    children: [
      { title: "Bebidas", type: "sub" },
      { title: "Tienda", type: "link", path: "/bebidas/bebidas" },
      { title: "Pedidos", type: "link", path: "/pedidos" },
    ],
  }
];
