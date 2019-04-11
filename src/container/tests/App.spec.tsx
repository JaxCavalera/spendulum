import React, { ReactElement } from 'react';
import { MemoryRouter } from 'react-router';
import {
  render,
  waitForElement,
  getByTestId,
  fireEvent,
  queryAllByText,
} from 'react-testing-library';

// Mocked Functionality
import { BrowseMockApis } from '../../apis/api-contexts';

// Component TestIds
import { cartItemSizeInfoTestIds } from '../../components/CartItemSizeInfo/CartItemSizeInfo';
import { cartSidebarTestIds } from '../../components/CartSidebar/CartSidebar';
import { cartWidgetTestIds } from '../../components/CartWidget/CartWidget';
import { loadingSpinnerTestIds } from '../../components/LoadingSpinner/LoadingSpinner';
import { productCardTestIds } from '../../components/ProductCard/ProductCard';

// Tested Component
import { App } from '../App';

// Test Helper Functions
const extractQtyFromTxt = (txt: string | null): number => {
  if (txt === null) {
    return 0;
  }

  const qtyMatches = txt.match(/\[.+\]/);

  if (qtyMatches === null) {
    return 0;
  }

  const qtyValue = qtyMatches[0].match(/\d+/);
  return (qtyValue === null) ? 0 : parseFloat(qtyValue[0]);
};

// Tests
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

  describe('When the "Add to Cart" button is clicked for a listed product', () => {
    describe('Then the available qty for the added ProductList item size will be reduced by 1', () => {
      test('And the added product will be displayed in the CartSidebar', async () => {
        const wrapper = render(
          <MemoryRouter initialEntries={['/']}>
            <App />
          </MemoryRouter>
        );

        const [productCards] = await waitForElement(
          () => [
            wrapper.getAllByTestId(productCardTestIds.ProductCardWrapper),
          ],
          { container: wrapper.container },
        );

        // Open the CartSidebar
        fireEvent.click(wrapper.getByTestId(cartWidgetTestIds.CartButton));
        const cartSidebar = wrapper.getByTestId(cartSidebarTestIds.CartSidebar);

        // Isolate target product in the ProductList
        const [firstProduct] = productCards;
        const initialAvailableQty = extractQtyFromTxt(firstProduct.textContent);
        const firstProductName = wrapper.getByTestId(productCardTestIds.FloatingLabel).textContent;

        // Add product
        fireEvent.click(getByTestId(firstProduct, productCardTestIds.AddToCartBtn));

        // Scan for affected sidebar item
        const [matchingCartSidebarProducts] = await waitForElement(
          () => [
            queryAllByText(
              cartSidebar,
              (firstProductName === null) ? 'failtest' : firstProductName,
            ),
          ],
        );

        // Scan for affected product in the ProductList
        const [updatedFirstProduct] = await wrapper.findAllByTestId(productCardTestIds.ProductCardWrapper);
        const finalAvailableQty = extractQtyFromTxt(updatedFirstProduct.textContent);

        // Assertions
        expect(matchingCartSidebarProducts).toHaveLength(1);
        expect(finalAvailableQty).toEqual(initialAvailableQty - 1);
      });
    });
  });

  describe('When size qty of a CartSidebar item is increased', () => {
    describe('And the available qty is greater or equal to the size qty being added', () => {
      describe('Then the affected ProductList item, available size qty will be reduced by the added amount', () => {
        test('And the size qty of the affected CartSidebar item will be increased by the added amount', async () => {
          const adjustedQtyValue = 4;

          const wrapper = render(
            <MemoryRouter initialEntries={['/']}>
              <App />
            </MemoryRouter>
          );

          const [productCards] = await waitForElement(
            () => [
              wrapper.getAllByTestId(productCardTestIds.ProductCardWrapper),
            ],
            { container: wrapper.container },
          );

          // Open the CartSidebar
          fireEvent.click(wrapper.getByTestId(cartWidgetTestIds.CartButton));
          const cartSidebar = wrapper.getByTestId(cartSidebarTestIds.CartSidebar);

          // Isolate target product in the ProductList
          const [firstProduct] = productCards;
          const initialAvailableQty = extractQtyFromTxt(firstProduct.textContent);
          const firstProductName = wrapper.getByTestId(productCardTestIds.FloatingLabel).textContent;

          // Add product
          fireEvent.click(getByTestId(firstProduct, productCardTestIds.AddToCartBtn));

          // Scan for affected sidebar item's input field
          const [cartSidebarSizeQtyInput] = await waitForElement(
            () => [
              getByTestId(
                cartSidebar,
                cartItemSizeInfoTestIds.CartItemQty
              ),
            ],
          ) as [HTMLInputElement];

          // Adjust qty of the added size in the CartSidebar
          fireEvent.change(
            cartSidebarSizeQtyInput,
            { target: { value: `${adjustedQtyValue}` } },
          );
          fireEvent.blur(cartSidebarSizeQtyInput);

          // Scan for affected product in the ProductList
          const [updatedFirstProduct] = await wrapper.findAllByTestId(productCardTestIds.ProductCardWrapper);
          const finalAvailableQty = extractQtyFromTxt(updatedFirstProduct.textContent);

          // Assertions
          expect(cartSidebarSizeQtyInput.value).toEqual(`${adjustedQtyValue}`);
          expect(finalAvailableQty).toEqual(initialAvailableQty - adjustedQtyValue);
        });
      });
    });

    describe('And the available qty is less than the size qty being added', () => {
      describe('Then the available qty for the affected ProductList item size qty will NOT change', () => {
        test('And the qty of the affected product size in the CartSidebar will NOT change', async () => {
        });
      });
    });
  });

  describe('When the size qty of a CartSidebar item is reduced', () => {
    describe('And the current size qty is greater or equal to the qty being removed', () => {
      describe('Then the affected ProductList item, available size qty will be increased by the removed amount', () => {
        test('And the affected product size qty in the CartSidebar will be decreased by the removed amount', async () => {
        });
      });
    });

    describe('And the current size qty is less than the qty being removed', () => {
      describe('Then the available qty for the affected ProductList item size will NOT change', () => {
        test('And the qty of the affected product size in the CartSidebar will NOT change', async () => {
        });
      });
    });
  });
});
