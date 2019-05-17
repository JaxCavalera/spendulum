import { createContext } from 'react';

// Models
import { ProductInfo } from '../utils/product-info-helpers';

// Apis
import {
  getAvailableProductsList,
  postAvailableProducts,
} from './app-apis';

// Context Interfaces
export interface BrowseApis {
  getAvailableProductsList: (useMockData?: boolean) => Promise<ProductInfo[]>;
}

export interface ConfigApis {
  getAvailableProductsList: (useMockData?: boolean) => Promise<ProductInfo[]>;
  postAvailableProducts: (productData: ProductInfo, useMockData?: boolean) => Promise<boolean>;
}

// Live Contexts
export const browseLiveApis = (): BrowseApis => ({
  getAvailableProductsList,
});
export const configLiveApis = (): ConfigApis => ({
  getAvailableProductsList,
  postAvailableProducts,
});

// Mock Contexts
export const browseMockApis = (): BrowseApis => ({
  getAvailableProductsList: () => getAvailableProductsList(true),
});
export const configMockApis = (): ConfigApis => ({
  getAvailableProductsList: () => getAvailableProductsList(true),
  postAvailableProducts: (productData: ProductInfo) => postAvailableProducts(productData, true),
});

// Context Wrappers
export const BrowseApisContext = createContext(browseMockApis());
export const ConfigApisContext = createContext(configMockApis());
