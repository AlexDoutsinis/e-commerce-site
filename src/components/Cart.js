import React from "react";

function Cart(props) {
  if (!props.cart.length) return "";

  return (
    <table className="cart">
      <tbody>
        <tr>
          <td colSpan="4">
            <h2>Cart</h2>
          </td>
        </tr>
        <tr>
          <th>Item</th>
          <th>Quantity</th>
          <th>Total Price</th>
          <th>Remove</th>
        </tr>

        {props.cart.map((value, index) => (
          <tr key={index}>
            <td>{value.product.name}</td>
            <td>
              <button onClick={() => props.removeProduct(value, true)}>
                -
              </button>
              {value.quantity}
              <button onClick={() => props.removeProduct(value, false)}>
                +
              </button>
            </td>
            <td>{value.quantity * value.product.price}</td>
            <td>
              <button onClick={() => props.clearProduct(value)}>ⓧ</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Cart;
