import React from 'react';
import ReactDOM from 'react-dom';
import { getTotalCost, getItemCount } from './util';

const products = [
  {
    id: '1',
    title: 'Blue Stripe Stoneware Plate',
    brand: 'Kiriko',
    price: 40,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at purus pulvinar, placerat turpis ac, interdum metus. In eget massa sed enim hendrerit auctor a eget.',
    image: 'blue-stripe-stoneware-plate.jpg'
  },
  {
    id: '2',
    title: 'Hand Painted Blue Flat Dish',
    brand: 'Kiriko',
    price: 28,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at purus pulvinar, placerat turpis ac, interdum metus. In eget massa sed enim hendrerit auctor a eget arcu. Curabitur ac pharetra nisl, sit amet mattis dolor.',
    image: 'hand-painted-blue-flat-dish.jpg'
  },
  {
    id: '3',
    title: 'Heme',
    brand: 'Dust & Form',
    price: 52,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at purus pulvinar, placerat turpis ac, interdum metus. In eget massa sed enim hendrerit auctor a eget arcu. Curabitur ac pharetra nisl, sit amet mattis dolor.',
    image: 'heme.jpg'
  },
  {
    id: '4',
    title: 'Mashiko-Yaki Green Small Plate',
    brand: 'Kiriko',
    price: 28,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at purus pulvinar, placerat turpis ac, interdum metus. In eget massa sed enim hendrerit auctor a eget.',
    image: 'mashiko-yaki-green-small-plate.jpg'
  },
  {
    id: '5',
    title: 'Mashiko-Yaki Indigo Small Plate',
    brand: 'Kiriko',
    price: 28,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at purus pulvinar, placerat turpis ac, interdum metus. In eget massa sed enim hendrerit auctor a eget.',
    image: 'mashiko-yaki-indigo-small-plate.jpg'
  },
  {
    id: '6',
    title: 'Mashiko-Yaki Saucer',
    brand: 'Kiriko',
    price: 18,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at purus pulvinar, placerat turpis ac, interdum metus. In eget massa sed enim hendrerit auctor a eget.',
    image: 'mashiko-yaki-saucer.jpg'
  }
];

test('getTotalCost', () => {
  const cart = {
    '1': 2,
    '2': 1
  };
  const filteredProducts = products.filter(p => cart[p.id]);
  expect(getTotalCost(filteredProducts, cart)).toBe(108);
});

test('getItemCount', () => {
  const cart = {
    '1': 2,
    '2': 1,
    '4': 4
  };
  expect(getItemCount(cart)).toBe(7);
});