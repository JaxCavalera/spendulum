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
export class BrowseLiveApis implements BrowseApis {
  public getAvailableProductsList: ApiFn;

  constructor() {
    this.getAvailableProductsList = getAvailableProductsList;
  }
}

// Mock Contexts
export class BrowseMockApis extends BrowseLiveApis {
  constructor() {
    super();

    this.getAvailableProductsList = () => getAvailableProductsList(true);
  }
}

// Context Wrappers
export const BrowseApisContext = createContext(new BrowseMockApis());
