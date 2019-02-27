import { consolidateCartItems } from '../ProductCard-logic';

// Models
import { ProductInfo } from '../ProductCard-models';

// Mocks
import { mockProductCardData } from './ProductCard-mocks';

// consolidateCartItems
describe('Given consolidateCartItems is called with valid newItem and cartItems', () => {
  describe('When the newItem has availableSizes for the specified claimedSize', () => {
    describe('AND the newItem is not currently listed in the cartItems', () => {
      test('Then the newItem will be added to the cartItems list', () => {
        const mockCartItems: ProductInfo[] = [];
        const finalCartItems = [{
          label: 'Kate Spade New York',
          value: 'ksny-1',
          claimedSizes: {
            any: 1,
          },
          availableSizes: {
            any: 9,
          },
          price: 77.4,
          minPrice: 63,
          maxPrice: 85,
          priceTimer: 0,
          imgUrl: 'https://i.imgur.com/lrCkut9.png',
        }];

        const newCartItems = consolidateCartItems(mockProductCardData, mockCartItems);

        expect(newCartItems).toEqual(finalCartItems);
      });
    });

    describe('AND the newItem is already listed in the cartItems', () => {
      test('Then the claimedSize qty will be added onto the existing size qty', () => {
        const mockCartItems: ProductInfo[] = [mockProductCardData];
        const finalCartItems = [{
          label: 'Kate Spade New York',
          value: 'ksny-1',
          claimedSizes: {
            any: 2,
          },
          availableSizes: {
            any: 8,
          },
          price: 77.4,
          minPrice: 63,
          maxPrice: 85,
          priceTimer: 0,
          imgUrl: 'https://i.imgur.com/lrCkut9.png',
        }];

        const newCartItems = consolidateCartItems(mockProductCardData, mockCartItems);

        expect(newCartItems).toEqual(finalCartItems);
      });
    });
  });
});
