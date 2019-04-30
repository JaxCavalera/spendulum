// Mock data
import productListMock from './tests/product-list-mock.json';

// Models
import { ProductInfo } from '../utils/product-info-helpers';

// Fetch Handler
import { fetchWrapper } from './fetch-wrapper';

export const getAvailableProductsList = async (useMockData?: boolean) => {
  if (useMockData) {
    const newProductsList: ProductInfo[] = await new Promise(
      resolve => setTimeout(() => resolve(productListMock), 1000),
    );

    return newProductsList;
  }

  // Live API
  try {
    const productsList = await fetchWrapper({
      url: 'https://api.jsonbin.io/b',
      method: 'GET',
      binName: 'productsList',
    });

    return productsList;
  } catch (error) {
    // Pass the error back up
    throw error;
  }
};
