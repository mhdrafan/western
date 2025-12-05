import React from 'react';

export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
  description: string;
  rating: number;
  reviews: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export type ViewState = 'HOME' | 'PRODUCT_DETAIL' | 'CHECKOUT';

export interface SectionRef {
  id: string;
  ref: React.RefObject<HTMLElement>;
}