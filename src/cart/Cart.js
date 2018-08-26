import React, { Component } from 'react';
import CartPopup from '../CartPopup';

class Cart extends Component {
  render() {
    return (
      <div className="Cart">
        <CartPopup />
      </div>
    );
  }
}

export default Cart;
