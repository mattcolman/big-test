import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import { TransitionMotion, spring } from 'react-motion';
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

const CartPopupContainer = styled.div`
  position: absolute;
  top: 45px;
  right: 10px;
  z-index: 100;
  background-color: white;
  width: 418px;
  max-width: 90vw;
  box-shadow: 0px 1px 1px grey;
`;

const Logo = styled.img`
  @media (min-width: 320px) and (max-width: 480px) {
    display: none;
  }
`;

const initCartFromLocalStorage =
  window.localStorage && window.localStorage.getItem('storefront-cart');

class App extends Component {
  // send our App state to context as our method of storing global state.
  // A shopping cart is typical use case for global state as it's accessed
  // in many parts of the site.
  // we could also use redux or mobx instead.
  state = {
    showCart: false,
    products: [],
    cart: initCartFromLocalStorage ? JSON.parse(initCartFromLocalStorage) : {}
  };

  componentDidMount() {
    this.fetchProducts();
  }

  async fetchProducts() {
    const res = await fetch('/products.json');
    const products = await res.json();
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
                const newCartState = {
                  ...state.cart,
                  [id]: (state.cart[id] || 0) + 1
                };
                // also store the cart in localStorage incase of connection dropout,
                // user navigates away and return later etc.
                if (window.localStorage) {
                  window.localStorage.setItem(
                    'storefront-cart',
                    JSON.stringify(newCartState)
                  );
                }
                return {
                  cart: newCartState
                };
              });
            },
            removeItem: id => {
              this.setState(state => {
                const newCartState = omit([id])(state.cart);
                if (window.localStorage) {
                  window.localStorage.setItem(
                    'storefront-cart',
                    JSON.stringify(newCartState)
                  );
                }
                return {
                  cart: newCartState
                };
              });
            }
          }
        }}
      >
        <div className="App">
          <Header>
            <Logo width={115} height={68} src="/media/logo.png" alt="logo" />
            <TopMenu>
              <MenuLink to="/">Home</MenuLink>
              <MenuLink to="#" arrow={1}>
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
              <TransitionMotion
                willEnter={() => ({
                  opacity: 0,
                  y: -10
                })}
                willLeave={() => ({
                  opacity: spring(0),
                  y: spring(-10)
                })}
                styles={
                  showCart
                    ? [
                        {
                          key: 'cart',
                          style: {
                            opacity: spring(1),
                            y: spring(0)
                          }
                        }
                      ]
                    : []
                }
              >
                {styles => {
                  return (
                    <div>
                      {styles.map(({ key, style }) => (
                        <CartPopupContainer
                          key={key}
                          style={{
                            opacity: style.opacity,
                            transform: `translate3d(0, ${style.y}px, 0)`
                          }}
                        >
                          <CartPopup viewCart />
                        </CartPopupContainer>
                      ))}
                    </div>
                  );
                }}
              </TransitionMotion>
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
