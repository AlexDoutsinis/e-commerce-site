import React, { useState } from "react";

function SingleProduct(props) {
  const [quantity, setQuantity] = useState(1);

  function handleQuantity(e) {
    setQuantity(parseInt(e.target.value));
  }

  function addToCart() {
    props.addToCart({ product: props.product, quantity });
  }

  if (!props.product) return <h2>Product not found</h2>;

  return (
    <div className="single-product">
      <img src={props.product.image} alt="" />
      <h2>{props.product.name}</h2>
      <p className="description">{props.product.description}</p>
      <p className="price">{props.product.price}</p>
      <div>
        <label>Quantity</label>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={handleQuantity}
        />
      </div>
      <button onClick={addToCart}>Add to cart</button>
    </div>
  );
}

export default SingleProduct;
