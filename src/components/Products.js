import React, { Component } from "react";
import formatCurrency from "../util";
import { Fade, Zoom } from "react-awesome-reveal";
import Modal from "react-modal";
import { connect } from "react-redux";
import { fetchProducts } from "../actions/productActions";
import { addToCart } from "../actions/cartActions";

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
    };
  }
  componentDidMount() {
    this.props.fetchProducts();
  }
  openModal = (product) => {
    this.setState({ product });
  };
  closeModal = () => {
    this.setState({ product: null });
  };

  render() {
    const { product } = this.state;
    return (
      <div>
        <Fade cascade direction="down">
          {!this.props.products ? (
            <div>Loading...</div>
          ) : (
            <ul className="products">
              {this.props.products.map((product) => (
                <li key={product._id}>
                  <div className="product">
                    <a
                      href={"#" + product._id}
                      onClick={() => this.openModal(product)}>
                      <img src={product.image} alt={product.title}></img>
                      <p>{product.title}</p>
                    </a>
                    <div className="product-price">
                      <div>{formatCurrency(product.price)}</div>
                      <button
                        onClick={() => this.props.addToCart(product)}
                        className="button primary">
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Fade>
        {product && (
          <Modal isOpen={true} onRequestClose={this.closeModal}>
            <Zoom>
              <button className="close-modal" onClick={this.closeModal}>
                x
              </button>
              <div className="product-details">
                <img src={product.image} alt={product.title}></img>
                <div className="product-details-description">
                  <p>
                    <strong>{product.title}</strong>
                  </p>
                  <p>{product.description}</p>
                  <p>
                    Avaiable Sizes:{" "}
                    {product.availableSizes.map((x) => (
                      <span>
                        {" "}
                        <button className="button">{x}</button>
                      </span>
                    ))}
                  </p>
                  <div className="product-price">
                    <div>{formatCurrency(product.price)}</div>
                    <button
                      className="button primary"
                      onClick={() => {
                        this.props.addToCart(product);
                        this.closeModal();
                      }}>
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            </Zoom>
          </Modal>
        )}
      </div>
    );
  }
}

export default connect(
  (state) => ({ products: state.products.filteredItems }),
  {
    fetchProducts,
    addToCart,
  }
)(Products);
