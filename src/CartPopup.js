import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import { compose, values, sum, find, get, sumBy } from 'lodash/fp';
import styled from 'styled-components';
import ItemPreview from './ItemPreview';
import { withContext } from './context';

const Wrapper = styled.div`
  position: absolute;
  top: 45px;
  right: 0;
  background-color: white;
  border: 1px solid black;
  width: 418px;
  z-index: 100;
`;
const ItemsWrapper = styled.div``;
const Footer = styled.div``;
const FooterText = styled.div`
  display: flex;
  justify-content: space-between;
`;
const FooterButtons = styled.div`
  display: flex;
`;
const ViewCartButton = styled.button``;
const CheckoutButton = styled.button``;

class CartPopup extends Component {
  render() {
    const {
      state: { cart, products }
    } = this.props;
    // This is not great - we should use memoization to only recompute when items change instead of each render
    // with redux reselect we get this for free using selectors, with context we'll have to use our own method.
    const filteredProducts = products.filter(product => cart[product.id]);
    const totalCost = compose(
      sumBy(item => {
        return cart[item.id] * item.price;
      })
    )(filteredProducts);
    return (
      <Wrapper>
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
            <ViewCartButton />
            <CheckoutButton />
          </FooterButtons>
        </Footer>
      </Wrapper>
    );
  }
}

export default withContext(CartPopup);
