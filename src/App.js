import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import { sum, values, compose, omit } from 'lodash/fp';
import styled from 'styled-components';
import './App.css';
import Category from './category/Category';
import Cart from './cart/Cart';
import Product from './product/Product';
import CartPopup from './CartPopup';
import { Provider } from './context';

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e4e4e4;
  height: 93px;
`;

const TopMenu = styled.div`
  display: flex;
  align-items: center;
`;

// here is an example of why I like styled-components.
// easily composeable and resuable!
// not to mention testable.
const withArrow = props => {
  return (
    props.arrow &&
    `
  &:after {
    content: '\f0dd';
    padding-left: 0.5em;
    font-family: 'font awesome 5 free';
    vertical-align: top;
  }
`
  );
};

const HeaderButton = styled.button`
  color: #434348;
  padding: 0.5em 1em;
  text-decoration: none;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 0.8em;
  ${withArrow};
`;

const CartButton = styled(HeaderButton)``;

const MenuLink = HeaderButton.withComponent(Link);

const CartContainer = styled.div`
  position: relative;
`;

class App extends Component {
  // send our App state to context as our method of storing global state.
  // A shopping cart is typical use case for global state as it's accessed
  // in many parts of the site.
  // we could also use redux or mobx instead.
  state = {
    showCart: false,
    products: [],
    cart: {}
  };

  componentDidMount() {
    this.fetchProducts();
  }

  async fetchProducts() {
    const res = await fetch('/products.json');
    const products = await res.json();
    console.log('hi products', products);
    this.setState({ products });
  }

  render() {
    const { cart, showCart } = this.state;
    const count = compose(
      sum,
      values
    )(cart);
    return (
      <Provider
        value={{
          state: this.state,
          actions: {
            addItem: id => {
              this.setState(state => {
                return {
                  cart: {
                    ...state.cart,
                    [id]: (state.cart[id] || 0) + 1
                  }
                };
              });
            },
            removeItem: id => {
              this.setState(state => ({ cart: omit([id])(state.cart) }));
            }
          }
        }}
      >
        <div className="App">
          <Header>
            <img width={115} height={68} src="/media/logo.png" alt="logo" />
            <TopMenu>
              <MenuLink to="#">Home</MenuLink>
              <MenuLink to="#" arrow>
                Shop
              </MenuLink>
              <MenuLink to="#">Journal</MenuLink>
              <MenuLink to="#">More</MenuLink>
            </TopMenu>
            <CartContainer>
              <CartButton
                arrow
                onClick={() => {
                  this.setState(state => ({ showCart: !state.showCart }));
                }}
              >
                My Cart ({count})
              </CartButton>
              {showCart && <CartPopup count={count} />}
            </CartContainer>
          </Header>

          <Route exact path="/" component={Category} />
          <Route path="/cart" component={Cart} />
          <Route path="/product/:id" component={Product} />
        </div>
      </Provider>
    );
  }
}

export default App;
