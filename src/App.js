import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import styled from 'styled-components';
import './App.css';
import Category from './category/Category';
import Cart from './cart/Cart';
import Product from './product/Product';

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e4e4e4;
  height: 93px;
  font-weight: 700;
  font-size: 0.8em;
`;

const TopMenu = styled.div`
  display: flex;
  align-items: center;
`;

const CartButton = styled.button``;

const MenuLink = styled(Link)`
  color: #434348;
  padding: 0.5em 1em;
  text-decoration: none;
  text-transform: uppercase;
  ${props =>
    props.arrow &&
    `
    &:after {
      content: '\f0dd';
      padding-left: 0.5em;
      font-family: 'font awesome 5 free';
      vertical-align: top;
    }
  `};
`;

class App extends Component {
  render() {
    return (
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
          <CartButton
            onClick={() => {
              console.log('click');
            }}
          >
            My Cart
          </CartButton>
        </Header>
        <p className="App-intro">
          To get started, delete this header and introduction, and begin
          building your app in the provided components.
        </p>
        <p className="App-intro">
          We've setup the bare minimum you need to get started, but feel free to
          add as many components as you see fit.
        </p>

        <header>
          <Link to="/cart">My Cart</Link>
        </header>

        <Route exact path="/" component={Category} />
        <Route path="/cart" component={Cart} />
        <Route path="/product/:id" component={Product} />
      </div>
    );
  }
}

export default App;
