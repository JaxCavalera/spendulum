import { ProductInfo } from '../ProductCard-models';

export const productCardData: ProductInfo = {
  label: 'Kate Spade New York',
  value: 'ksny-1',
  claimedSizes: {},
  availableSizes: {
    na: 10,
  },
  price: 77.4,
  minPrice: 63,
  maxPrice: 85,
  priceTimer: 0,
  imgUrl: 'https://i.imgur.com/lrCkut9.png',
};

export const productCardMatchingCartItem: ProductInfo = {
  label: 'Kate Spade New York',
  value: 'ksny-1',
  claimedSizes: {},
  availableSizes: {
    na: 8,
  },
  price: 77.4,
  minPrice: 63,
  maxPrice: 85,
  priceTimer: 0,
  imgUrl: 'https://i.imgur.com/lrCkut9.png',
};

export const cartItemsList: ProductInfo[] = [{
  label: 'Kate Spade New York',
  value: 'ksny-1',
  claimedSizes: {
    na: 2,
  },
  availableSizes: {
    na: 8,
  },
  price: 77.4,
  minPrice: 63,
  maxPrice: 85,
  priceTimer: 0,
  imgUrl: 'https://i.imgur.com/lrCkut9.png',
}];
