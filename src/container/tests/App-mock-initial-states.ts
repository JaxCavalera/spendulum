import { RootReducerStore } from '../rootReducer';

export const singleAddedProductOneSize: RootReducerStore = {
  configurationStore: {
    productMicroStoreIds: [],
  },
  accountWidgetStore: {
    loggedIn: false,
  },
  productListStore: {
    productMicroStoreIds: [
      'ksny-1',
      'jcsvm-1',
      'snwflk-1',
      'nvyjns-1',
      'nsocr-1',
    ],
    'ksny-1': {
      label: 'Kate Spade New York',
      value: 'ksny-1',
      claimedSizes: { NA: 4 },
      availableSizes: {
        NA: 6,
      },
      price: 77.4,
      minPrice: 63,
      maxPrice: 85,
      priceTimer: '2019-03-03T12: 27: 08.030Z',
      imgUrl: 'https: //i.imgur.com/lrCkut9.png',
    },
    'jcsvm-1': {
      label: 'Just Cavalli',
      value: 'jcsvm-1',
      claimedSizes: {},
      availableSizes: {
        NA: 37,
      },
      price: 107,
      minPrice: 95,
      maxPrice: 112,
      priceTimer: '2019-03-03T12: 27: 08.030Z',
      imgUrl: 'https: //i.imgur.com/Igq4dBW.jpg',
    },
    'snwflk-1': {
      label: 'Snowflake Shirt',
      value: 'snwflk-1',
      claimedSizes: {},
      availableSizes: {
        S: 7,
        L: 16,
      },
      price: 12,
      minPrice: 12,
      maxPrice: 18,
      priceTimer: '2019-03-03T12: 27: 08.030Z',
      imgUrl: 'https: //i.imgur.com/9frBHl9.jpg',
    },
    'nvyjns-1': {
      label: 'Navy Denim Jeans',
      value: 'nvyjns-1',
      claimedSizes: {},
      availableSizes: {
        XS: 5,
        M: 21,
      },
      price: 40,
      minPrice: 32,
      maxPrice: 40,
      priceTimer: '2019-03-03T12: 27: 08.030Z',
      imgUrl: 'https: //i.imgur.com/Hs1JnpR.jpg',
    },
    'nsocr-1': {
      label: 'Nike Soccerball Ninja',
      value: 'nsocr-1',
      claimedSizes: {},
      availableSizes: {
        NA: 204,
      },
      price: 16,
      minPrice: 15,
      maxPrice: 26,
      priceTimer: '2019-03-03T12: 27: 08.030Z',
      imgUrl: 'https: //i.imgur.com/EHQoYlJ.jpg',
    },
  },
  cartSidebarStore: {
    isSidebarOpen: true,
    cartItemMicroStoreIds: ['ksny-1'],
    'ksny-1': {
      label: 'Kate Spade New York',
      value: 'ksny-1',
      claimedSizes: { NA: 4 },
      availableSizes: {
        NA: 6,
      },
      price: 77.4,
      minPrice: 63,
      maxPrice: 85,
      priceTimer: '2019-03-03T12:27:08.030Z',
      imgUrl: 'https://i.imgur.com/lrCkut9.png',
    },
  },
};

export const singleAddedProductTwoSizes: RootReducerStore = {
  configurationStore: {
    productMicroStoreIds: [],
  },
  accountWidgetStore: {
    loggedIn: false,
  },
  productListStore: {
    productMicroStoreIds: [
      'ksny-1',
      'jcsvm-1',
      'snwflk-1',
      'nvyjns-1',
      'nsocr-1',
    ],
    'ksny-1': {
      label: 'Kate Spade New York',
      value: 'ksny-1',
      claimedSizes: {},
      availableSizes: {
        NA: 10,
      },
      price: 77.4,
      minPrice: 63,
      maxPrice: 85,
      priceTimer: '2019-03-03T12: 27: 08.030Z',
      imgUrl: 'https: //i.imgur.com/lrCkut9.png',
    },
    'jcsvm-1': {
      label: 'Just Cavalli',
      value: 'jcsvm-1',
      claimedSizes: {},
      availableSizes: {
        NA: 37,
      },
      price: 107,
      minPrice: 95,
      maxPrice: 112,
      priceTimer: '2019-03-03T12: 27: 08.030Z',
      imgUrl: 'https: //i.imgur.com/Igq4dBW.jpg',
    },
    'snwflk-1': {
      label: 'Snowflake Shirt',
      value: 'snwflk-1',
      claimedSizes: {
        S: 3,
        L: 5,
      },
      availableSizes: {
        S: 4,
        L: 11,
      },
      price: 12,
      minPrice: 12,
      maxPrice: 18,
      priceTimer: '2019-03-03T12: 27: 08.030Z',
      imgUrl: 'https: //i.imgur.com/9frBHl9.jpg',
    },
    'nvyjns-1': {
      label: 'Navy Denim Jeans',
      value: 'nvyjns-1',
      claimedSizes: {},
      availableSizes: {
        XS: 5,
        M: 21,
      },
      price: 40,
      minPrice: 32,
      maxPrice: 40,
      priceTimer: '2019-03-03T12: 27: 08.030Z',
      imgUrl: 'https: //i.imgur.com/Hs1JnpR.jpg',
    },
    'nsocr-1': {
      label: 'Nike Soccerball Ninja',
      value: 'nsocr-1',
      claimedSizes: {},
      availableSizes: {
        NA: 204,
      },
      price: 16,
      minPrice: 15,
      maxPrice: 26,
      priceTimer: '2019-03-03T12: 27: 08.030Z',
      imgUrl: 'https: //i.imgur.com/EHQoYlJ.jpg',
    },
  },
  cartSidebarStore: {
    isSidebarOpen: true,
    cartItemMicroStoreIds: ['snwflk-1'],
    'snwflk-1': {
      label: 'Snowflake Shirt',
      value: 'snwflk-1',
      claimedSizes: {
        S: 3,
        L: 5,
      },
      availableSizes: {
        S: 4,
        L: 11,
      },
      price: 12,
      minPrice: 12,
      maxPrice: 18,
      priceTimer: '2019-03-03T12: 27: 08.030Z',
      imgUrl: 'https: //i.imgur.com/9frBHl9.jpg',
    },
  },
};
