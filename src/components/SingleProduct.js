import React from "react";

function SingleProduct(props) {
  function addToCart() {
    props.addToCart({ product: props.product, quantity: 1 });
  }

  if (!props.product) return <h2>Product not found</h2>;

  return (
    <div className="single-product">
      <img src={props.product.image} alt="" />
      <h2>{props.product.name}</h2>
      <p className="description">{props.product.description}</p>
      <p className="price">{props.product.price}</p>
      <button onClick={addToCart}>Add to cart</button>
    </div>
  );
}

export default SingleProduct;
