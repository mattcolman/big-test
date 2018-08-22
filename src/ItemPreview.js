import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
`;

const Image = styled.img`
  flex-shrink: 0;
`;

const Title = styled.span`
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
`;

const SmallText = styled.span`
  font-size: 0.7rem;
`;

const RemoveButton = styled.button``;

class ItemPreview extends Component {
  render() {
    const { image, title, price, brand, quantity } = this.props;
    console.log('what iamge', image);
    return (
      <Wrapper>
        <Image src={`/media/${image}`} alt="product" width={80} height={80} />
        <Body>
          <span>
            <Title>{title}</Title>
            <SmallText>x {quantity}</SmallText>
          </span>
          <span>{brand}</span>
          <span>${price}</span>
        </Body>
        <RemoveButton onClick={() => {}}>X</RemoveButton>
      </Wrapper>
    );
  }
}

export default ItemPreview;
