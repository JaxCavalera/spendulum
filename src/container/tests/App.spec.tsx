import React, { ReactElement } from 'react';
import { MemoryRouter } from 'react-router';
import { render, waitForElement } from 'react-testing-library';

// Mocked Functionality
import { BrowseMockApis } from '../../apis/api-contexts';

// Component TestIds
import { loadingSpinnerTestIds } from '../../components/LoadingSpinner/LoadingSpinner';
import { productCardTestIds } from '../../components/ProductCard/ProductCard';

// Tested Component
import { App } from '../App';

describe('Given the App is mounted at the / route', () => {
  beforeEach(async () => {
    jest.resetModules();

    // Mock Contents
    const mockBrowserRouter = ({ children }: { children: ReactElement }) => <div>{children}</div>;
    const mockBrowseApis = BrowseMockApis;

    // Mocks
    jest.mock('react-router-dom/BrowserRouter', () => mockBrowserRouter);
    jest.mock('../../apis/api-contexts', () => ({ BrowseLiveApis: mockBrowseApis }));
  });

  describe('When it first loads', () => {
    test('Then the LoadingSpinner component will be displayed', () => {
      const { getAllByTestId } = render(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      );

      const spinners = getAllByTestId(loadingSpinnerTestIds.Spinner);

      expect(spinners).toHaveLength(1);
    });
  });

  describe('When it has finished loading', () => {
    test('Then the LoadingSpinner component will NOT be displayed', async () => {
      const { container, getAllByTestId, queryAllByTestId } = render(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      );

      const [productCards] = await waitForElement(
        () => [
          getAllByTestId(productCardTestIds.ProductCardWrapper),
        ],
        { container },
      );

      const spinners = queryAllByTestId(loadingSpinnerTestIds.Spinner);

      expect(productCards).toHaveLength(5);
      expect(spinners).toHaveLength(0);
    });
  });
});
