import { createContext } from 'react';

// Models
import { ProductInfo } from '../utils/product-info-helpers';

// Apis
import { getAvailableProductsList } from './product-list-apis';

// Context Interfaces
export interface BrowseApis {
  getAvailableProductsList: (useMockData?: boolean) => Promise<ProductInfo[]>;
}

// Contexts
export const browseLiveApis: BrowseApis = {
  getAvailableProductsList,
};

export const BrowseApisContext = createContext(browseLiveApis);
