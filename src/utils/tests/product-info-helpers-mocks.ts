import { ProductInfo } from '../product-info-helpers';

export const productCardData: ProductInfo = {
  label: 'Kate Spade New York',
  value: 'ksny-1',
  claimedSizes: {},
  availableSizes: {
    NA: 10,
  },
  price: 77.4,
  minPrice: 63,
  maxPrice: 85,
  priceTimer: '2019-03-03T12:27:08.030Z',
  imgUrl: 'https://i.imgur.com/lrCkut9.png',
};

export const productCardMatchingCartItem: ProductInfo = {
  label: 'Kate Spade New York',
  value: 'ksny-1',
  claimedSizes: {},
  availableSizes: {
    NA: 8,
  },
  price: 77.4,
  minPrice: 63,
  maxPrice: 85,
  priceTimer: '2019-03-03T12:27:08.030Z',
  imgUrl: 'https://i.imgur.com/lrCkut9.png',
};

export const cartItemsList: ProductInfo[] = [{
  label: 'Kate Spade New York',
  value: 'ksny-1',
  claimedSizes: {
    NA: 2,
  },
  availableSizes: {
    NA: 8,
  },
  price: 77.4,
  minPrice: 63,
  maxPrice: 85,
  priceTimer: '2019-03-03T12:27:08.030Z',
  imgUrl: 'https://i.imgur.com/lrCkut9.png',
}];
