import React from "react";
import Products from "../components/Products";
import Filter from "../components/Filter";
import Cart from "../components/Cart";

export default function HomeScreen() {
  return (
    <div className="content">
      <div className="main">
        <Filter />
        <Products />
      </div>
      <div className="sidebar">
        <Cart />
      </div>
    </div>
  );
}
