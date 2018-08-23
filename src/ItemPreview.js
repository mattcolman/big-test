import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import { withContext } from './context';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  flex-grow: 1;
`;

const Image = styled.div`
  flex-shrink: 0;
  background-image: ${props => `url(${props.url})`};
  background-size: cover;
  background-position: center;
  width: 80px;
  height: 80px;
`;

const Title = styled.span`
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
`;

const SmallText = styled.span`
  font-size: 0.7rem;
`;

const RemoveButton = styled.button`
  font-family: 'font awesome 5 free';
  align-self: flex-start;
  padding: 0.5rem;
  color: grey;
`;

class ItemPreview extends Component {
  render() {
    const { id, image, title, price, brand, quantity, actions } = this.props;
    console.log('what iamge', image);
    return (
      <Wrapper>
        <Image url={`/media/${image}`} alt="product" />
        <Body>
          <span>
            <Title>{title}</Title>
            <SmallText>x {quantity}</SmallText>
          </span>
          <span>{brand}</span>
          <span>${price}</span>
        </Body>
        <RemoveButton
          onClick={() => {
            actions.removeItem(id);
          }}>
          <i class="fas fa-times" />
        </RemoveButton>
      </Wrapper>
    );
  }
}

export default withContext(ItemPreview);
