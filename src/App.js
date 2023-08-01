import React, { Component } from "react";
import data from "./data.json";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      size: "",
      sort: "",
    };
  }
  render() {
    return (
      <div className="grid-container">
        <header>
          <a href="/">My Shopping Web</a>
        </header>
        <main>
          <div className="content">
            <div className="main">Products</div>
            <div className="sidebar">Cart Item</div>
          </div>
        </main>
        <footer>All right is reserved.</footer>
      </div>
    );
  }
}
