import { createContext } from 'react';

// Models
import { ProductInfo } from '../utils/product-info-helpers';

// Apis
import { getAvailableProductsList } from './product-list-apis';

// Context Interfaces
export type ApiFn = (useMockData?: boolean) => Promise<ProductInfo[]>;

export interface BrowseApis {
  getAvailableProductsList: ApiFn;
}

// Live Contexts
export const browseLiveApis = (): BrowseApis => ({
  getAvailableProductsList,
});

// Mock Contexts
export const browseMockApis = (): BrowseApis => ({
  getAvailableProductsList: () => getAvailableProductsList(true),
});

// Context Wrappers
export const BrowseApisContext = createContext(browseMockApis());
