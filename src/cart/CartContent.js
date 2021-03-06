import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ItemPreview from './ItemPreview';
import { withContext } from '../context';
import { getTotalCost, getItemCount } from '../util';

const Wrapper = styled.div``;

const ItemsWrapper = styled.div``;

const Footer = styled.div`
  padding: 0.5em;
  color: grey;
  text-transform: uppercase;
`;

const FooterText = styled.div`
  border-top: 1px solid grey;
  display: flex;
  justify-content: space-between;
  padding: 0.5em 0;
`;

const FooterButtons = styled.div`
  display: flex;
  & > :not(:first-child) {
    margin-left: 0.5em;
  }
`;

const ViewCartLink = styled(Link)`
  background-color: white;
  border: 1px solid black;
  padding: 1rem;
  color: black;
  text-transform: uppercase;
  flex: 1;
`;

const CheckoutButton = styled.button`
  background-color: black;
  color: white;
  padding: 1rem;
  text-transform: uppercase;
  flex: 1;
`;

const EmptyWrapper = styled.div`
  padding: 1rem;
  text-transform: uppercase;
`;

class CartContent extends Component {
  static defaultProps = {
    viewCart: false
  };
  render() {
    const {
      style,
      state: { cart, products },
      viewCart
    } = this.props;
    // This is not great - we should use memoization to only recompute when items change instead of each render
    // with redux reselect we get this for free using selectors, with context we'll have to use our own method.
    const filteredProducts = products.filter(product => cart[product.id]);
    const totalCost = getTotalCost(filteredProducts, cart);
    const count = getItemCount(cart);
    if (count === 0) {
      return (
        <Wrapper style={style}>
          <EmptyWrapper>Your cart is Empty :(</EmptyWrapper>
        </Wrapper>
      );
    }
    return (
      <Wrapper style={style}>
        <ItemsWrapper>
          {filteredProducts.map(item => (
            <ItemPreview
              id={item.id}
              key={item.id}
              brand={item.brand}
              image={item.image}
              title={item.title}
              quantity={cart[item.id]}
              price={item.price}
            />
          ))}
        </ItemsWrapper>
        <Footer>
          <FooterText>
            Total
            <span>${totalCost}</span>
          </FooterText>
          <FooterButtons>
            {viewCart && <ViewCartLink to="/cart">View Cart</ViewCartLink>}
            <CheckoutButton>Checkout</CheckoutButton>
          </FooterButtons>
        </Footer>
      </Wrapper>
    );
  }
}

export default withContext(CartContent);
