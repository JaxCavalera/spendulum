// Mock data
import productListMock from './tests/product-list-mock.json';

// Models
import { ProductInfo } from '../utils/product-info-helpers';

// Fetch Handler
import { fetchWrapper } from './fetch-wrapper';

const baseUrl = 'https://api.myjson.com/bins/1hj2g2';
const readKey = '1ced95e7-cd50-4ac5-ad27-bee9b0cb2ec5';
const adminKey = 'f21181f3-c664-41c0-b97d-fe86db844e2b';

export const getAvailableProductsList = async (useMockData?: boolean) => {
  if (useMockData) {
    const newProductsList: ProductInfo[] = await new Promise(
      resolve => setTimeout(() => resolve(productListMock), 1000),
    );

    return newProductsList;
  }

  // Live API
  try {
    const result = await fetchWrapper({
      url: baseUrl + readKey,
      method: 'GET',
    });

    const { products } = result.data.mossByte.object;
    const productsList: ProductInfo[] = Object.keys(products).map(productId => products[productId]);

    return productsList;
  } catch (error) {
    // Pass the error back up
    throw error;
  }
};

export const postAvailableProducts = async (productData: ProductInfo, useMockData?: boolean) => {
  if (useMockData) {
    await new Promise(
      resolve => setTimeout(() => resolve(true), 1000),
    );

    return true;
  }

  // Live API
  try {
    const result = await fetchWrapper({
      url: baseUrl + readKey,
      method: 'GET',
    });

    const { products } = result.data.mossByte.object;

    const updatedProducts = {
      object: {
        products: {
          ...products,
          [productData.value]: productData,
        },
      },
    };

    await fetchWrapper({
      url: baseUrl + adminKey,
      method: 'PUT',
      contentType: 'application/json',
      bodyPayload: updatedProducts,
    });

    return true;
  } catch (error) {
    // Pass the error back up
    throw error;
  }
};
