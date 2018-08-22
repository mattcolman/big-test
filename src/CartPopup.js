import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import { compose, find, get } from 'lodash/fp';
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
    // This is terrible - we should use only recompute totalCost when cart items change
    const totalCost = 56;
    const { cart, products } = this.props;
    const filteredProducts = products.filter(product =>
      cart.items.find(cartItem => cartItem.id === product.id)
    );
    return (
      <Wrapper>
        <ItemsWrapper>
          {cart.items.map(item => (
            <ItemPreview
              key={item.id}
              brand={item.brand}
              description={item.description}
              image={item.image}
              title={item.title}
              quantity={compose(
                get('quantity'),
                find(cartItem => cartItem.id === item.id)
              )(cart.items)}
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
