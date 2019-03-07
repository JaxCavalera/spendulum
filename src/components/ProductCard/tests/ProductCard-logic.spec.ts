import { updateProductData } from '../ProductCard-logic';

// Mocks
import { productCardData } from './ProductCard-mocks';

// updateProductData
describe('Given updateProductData is called with valid newItem and cartItems', () => {
  describe('When the newItem has availableSizes for the selectedSize', () => {
    test('Then it will return a new cardData set with updated claimed and available sizes', () => {
      const finalProductData = {
        label: 'Kate Spade New York',
        value: 'ksny-1',
        claimedSizes: { NA: 1 },
        availableSizes: {
          NA: 9,
        },
        price: 77.4,
        minPrice: 63,
        maxPrice: 85,
        priceTimer: '2019-03-03T12:27:08.030Z',
        imgUrl: 'https://i.imgur.com/lrCkut9.png',
      };

      const newCardData = updateProductData(productCardData, 'NA', 1);

      expect(newCardData).toEqual(finalProductData);
    });
  });

  describe('When the newItem does NOT have any availableSizes for the selectedSize', () => {
    test('Then it will return undefined', () => {
      const requestedQty = (productCardData.availableSizes.NA && productCardData.availableSizes.NA + 1) || 9001;
      const newCardData = updateProductData(productCardData, 'NA', requestedQty);

      expect(newCardData).not.toBeDefined;
    });
  });
});
