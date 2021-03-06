import React, { ReactElement } from 'react';
import { MemoryRouter } from 'react-router-dom';
import {
  render,
  waitForElement,
  getByTestId,
  fireEvent,
  queryAllByText,
  getAllByTestId,
} from 'react-testing-library';

// Mocked Functionality
import * as apiContexts from '../../apis/api-contexts';
import * as rootReducerExports from '../rootReducer';
import {
  singleAddedProductOneSize,
  singleAddedProductTwoSizes,
} from './App-mock-initial-states';

// Component TestIds
import { cartItemSizeInfoTestIds } from '../../components/CartItemSizeInfo/CartItemSizeInfo';
import { cartSidebarTestIds } from '../../components/CartSidebar/CartSidebar';
import { cartWidgetTestIds } from '../../components/CartWidget/CartWidget';
import { loadingSpinnerTestIds } from '../../components/LoadingSpinner/LoadingSpinner';
import { productCardTestIds } from '../../components/ProductCard/ProductCard';

// Tested Component
import { App } from '../App';
import { cartItemTestIds } from '../../components/CartItem/CartItem';

// Test Helpers
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
  const mockBrowseApis = jest.spyOn(apiContexts as any, 'browseLiveApis');

  beforeEach(() => {
    jest.resetModules();

    // Mock Contents
    const mockBrowserRouter = ({ children }: { children: ReactElement }) => <div>{children}</div>;

    // Mocks
    jest.mock('react-router-dom/BrowserRouter', () => mockBrowserRouter);
    mockBrowseApis.mockImplementation(apiContexts.browseMockApis);
  });

  afterEach(() => {
    mockBrowseApis.mockReset();
  });

  afterAll(() => {
    mockBrowseApis.mockRestore();
  });

  describe('When it first loads', () => {
    test('Then the LoadingSpinner component will be displayed', () => {
      const wrapper = render(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>,
      );

      const spinners = wrapper.getAllByTestId(loadingSpinnerTestIds.SpinnerId);

      expect(spinners).toHaveLength(1);
    });
  });

  describe('When it has finished loading', () => {
    test('Then the LoadingSpinner component will NOT be displayed', async () => {
      const wrapper = render(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>,
      );

      const [productCards] = await waitForElement(
        () => [
          wrapper.getAllByTestId(productCardTestIds.ProductCard),
        ],
        { container: wrapper.container },
      );

      const spinners = wrapper.queryAllByTestId(loadingSpinnerTestIds.SpinnerId);

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
          </MemoryRouter>,
        );

        const [productCards] = await waitForElement(
          () => [
            wrapper.getAllByTestId(productCardTestIds.ProductCard),
          ],
          { container: wrapper.container },
        );

        // Open the CartSidebar
        fireEvent.click(wrapper.getByTestId(cartWidgetTestIds.CartButtonId));
        const cartSidebar = wrapper.getByTestId(cartSidebarTestIds.CartSidebarId);

        // Isolate target product in the ProductList
        const [firstProduct] = productCards;
        const initialAvailableQty = extractQtyFromTxt(firstProduct.textContent);

        const firstProductName = getByTestId(
          firstProduct,
          productCardTestIds.FloatingLabelId,
        ).textContent;

        // Add product
        fireEvent.click(getByTestId(firstProduct, productCardTestIds.AddToCartBtnId));

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
        const [updatedFirstProduct] = await wrapper.findAllByTestId(
          productCardTestIds.ProductCard,
        );
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
            </MemoryRouter>,
          );

          const [productCards] = await waitForElement(
            () => [
              wrapper.getAllByTestId(productCardTestIds.ProductCard),
            ],
            { container: wrapper.container },
          );

          // Open the CartSidebar
          fireEvent.click(wrapper.getByTestId(cartWidgetTestIds.CartButtonId));
          const cartSidebar = wrapper.getByTestId(cartSidebarTestIds.CartSidebarId);

          // Isolate target product in the ProductList
          const [firstProduct] = productCards;
          const initialAvailableQty = extractQtyFromTxt(firstProduct.textContent);

          // Add product
          fireEvent.click(getByTestId(firstProduct, productCardTestIds.AddToCartBtnId));

          // Scan for affected sidebar item's input field
          const [cartSidebarSizeQtyInput] = await waitForElement(
            () => [
              getByTestId(
                cartSidebar,
                cartItemSizeInfoTestIds.CartItemQtyId,
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
          const [updatedFirstProduct] = await wrapper.findAllByTestId(
            productCardTestIds.ProductCard,
          );
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
          const adjustedQtyValue = 500;

          const wrapper = render(
            <MemoryRouter initialEntries={['/']}>
              <App />
            </MemoryRouter>,
          );

          const [productCards] = await waitForElement(
            () => [
              wrapper.getAllByTestId(productCardTestIds.ProductCard),
            ],
            { container: wrapper.container },
          );

          // Open the CartSidebar
          fireEvent.click(wrapper.getByTestId(cartWidgetTestIds.CartButtonId));
          const cartSidebar = wrapper.getByTestId(cartSidebarTestIds.CartSidebarId);

          // Isolate target product in the ProductList
          const [firstProduct] = productCards;
          const initialAvailableQty = extractQtyFromTxt(firstProduct.textContent);

          // Add product
          fireEvent.click(getByTestId(firstProduct, productCardTestIds.AddToCartBtnId));

          // Scan for affected sidebar item's input field
          const [cartSidebarSizeQtyInput] = await waitForElement(
            () => [
              getByTestId(
                cartSidebar,
                cartItemSizeInfoTestIds.CartItemQtyId,
              ),
            ],
          ) as [HTMLInputElement];

          // Attempt to adjust qty of the added size in the CartSidebar
          fireEvent.change(
            cartSidebarSizeQtyInput,
            { target: { value: `${adjustedQtyValue}` } },
          );
          fireEvent.blur(cartSidebarSizeQtyInput);

          // Scan for affected product in the ProductList
          const [updatedFirstProduct] = await wrapper.findAllByTestId(
            productCardTestIds.ProductCard,
          );
          const finalAvailableQty = extractQtyFromTxt(updatedFirstProduct.textContent);

          // Assertions
          expect(cartSidebarSizeQtyInput.value).toEqual('1');
          expect(finalAvailableQty).toEqual(initialAvailableQty - 1);
        });
      });
    });
  });

  describe('When the size qty of a CartSidebar item is reduced', () => {
    describe('And the current size qty is greater or equal to the qty being removed', () => {
      describe('Then the affected ProductList item, available size qty will be increased by the removed amount', () => {
        test('And the affected product size qty in the CartSidebar will be decreased by the removed amount', async () => {
          const sidebarAddQty = 4;
          const sidebarReduceQty = 3;

          const wrapper = render(
            <MemoryRouter initialEntries={['/']}>
              <App />
            </MemoryRouter>,
          );

          const [productCards] = await waitForElement(
            () => [
              wrapper.getAllByTestId(productCardTestIds.ProductCard),
            ],
            { container: wrapper.container },
          );

          // Open the CartSidebar
          fireEvent.click(wrapper.getByTestId(cartWidgetTestIds.CartButtonId));
          const cartSidebar = wrapper.getByTestId(cartSidebarTestIds.CartSidebarId);

          // Isolate target product in the ProductList
          const [firstProduct] = productCards;

          // Add product
          fireEvent.click(getByTestId(firstProduct, productCardTestIds.AddToCartBtnId));

          // Scan for current CartSidebar item's input field
          const [currentSidebarItemInput] = await waitForElement(
            () => [
              getByTestId(
                cartSidebar,
                cartItemSizeInfoTestIds.CartItemQtyId,
              ),
            ],
          ) as [HTMLInputElement];

          // Prepare current sidebar item by increasing the added size qty
          fireEvent.change(
            currentSidebarItemInput,
            { target: { value: `${sidebarAddQty}` } },
          );
          fireEvent.blur(currentSidebarItemInput);

          // Scan for affected sidebar item's input field to reduce size qty
          const [affectedSidebarItemInput] = await waitForElement(
            () => [
              getByTestId(
                cartSidebar,
                cartItemSizeInfoTestIds.CartItemQtyId,
              ),
            ],
          ) as [HTMLInputElement];

          // Extract the current item's available size qty from the ProductList
          const currentProductListSizeQty = extractQtyFromTxt(firstProduct.textContent);

          // Reduce size qty of the affected item in the CartSidebar
          fireEvent.change(
            affectedSidebarItemInput,
            { target: { value: `${sidebarAddQty - sidebarReduceQty}` } },
          );
          fireEvent.blur(affectedSidebarItemInput);

          // Scan for affected product in the ProductList
          const [updatedFirstProduct] = await wrapper.findAllByTestId(
            productCardTestIds.ProductCard,
          );
          const finalAvailableQty = extractQtyFromTxt(updatedFirstProduct.textContent);

          // Assertions
          expect(affectedSidebarItemInput.value).toEqual(`${sidebarAddQty - sidebarReduceQty}`);
          expect(finalAvailableQty).toEqual(currentProductListSizeQty + sidebarReduceQty);
        });
      });
    });

    describe('And the current size qty is less than the qty being removed', () => {
      describe('Then the available qty for the affected ProductList item size will NOT change', () => {
        test('And the qty of the affected product size in the CartSidebar will NOT change', async () => {
          const sidebarAddQty = 4;
          const sidebarReduceQty = 7;

          const wrapper = render(
            <MemoryRouter initialEntries={['/']}>
              <App />
            </MemoryRouter>,
          );

          const [productCards] = await waitForElement(
            () => [
              wrapper.getAllByTestId(productCardTestIds.ProductCard),
            ],
            { container: wrapper.container },
          );

          // Open the CartSidebar
          fireEvent.click(wrapper.getByTestId(cartWidgetTestIds.CartButtonId));
          const cartSidebar = wrapper.getByTestId(cartSidebarTestIds.CartSidebarId);

          // Isolate target product in the ProductList
          const [firstProduct] = productCards;

          // Add product
          fireEvent.click(getByTestId(firstProduct, productCardTestIds.AddToCartBtnId));

          // Scan for current CartSidebar item's input field
          const [currentSidebarItemInput] = await waitForElement(
            () => [
              getByTestId(
                cartSidebar,
                cartItemSizeInfoTestIds.CartItemQtyId,
              ),
            ],
          ) as [HTMLInputElement];

          // Prepare current sidebar item by increasing the added size qty
          fireEvent.change(
            currentSidebarItemInput,
            { target: { value: `${sidebarAddQty}` } },
          );
          fireEvent.blur(currentSidebarItemInput);

          // Scan for affected sidebar item's input field to reduce size qty
          const [affectedSidebarItemInput] = await waitForElement(
            () => [
              getByTestId(
                cartSidebar,
                cartItemSizeInfoTestIds.CartItemQtyId,
              ),
            ],
          ) as [HTMLInputElement];

          // Extract the current item's available size qty from the ProductList
          const currentProductListSizeQty = extractQtyFromTxt(firstProduct.textContent);

          // Attempt to reduce size qty of the affected item in the CartSidebar by a negative value
          fireEvent.change(
            affectedSidebarItemInput,
            { target: { value: `${sidebarAddQty - sidebarReduceQty}` } },
          );
          fireEvent.blur(affectedSidebarItemInput);

          // Scan for affected product in the ProductList
          const [updatedFirstProduct] = await wrapper.findAllByTestId(
            productCardTestIds.ProductCard,
          );
          const finalAvailableQty = extractQtyFromTxt(updatedFirstProduct.textContent);

          // Assertions
          expect(affectedSidebarItemInput.value).toEqual(`${sidebarAddQty}`);
          expect(finalAvailableQty).toEqual(currentProductListSizeQty);
        });
      });
    });
  });

  describe('When the TrashIconButton for an added product in the CartSidebar is clicked', () => {
    describe('Then the affected ProductList item, available size qty will be set to the original amount', () => {
      test('And the affected CartSidebar item will be removed from the cart', async () => {
        // Mocks
        const mockInitialState = jest.spyOn(rootReducerExports as any, 'rootReducerInitialState');
        mockInitialState.mockImplementation(() => singleAddedProductOneSize);

        // Mount wrapper component
        const wrapper = render(
          <MemoryRouter initialEntries={['/']}>
            <App />
          </MemoryRouter>,
        );

        const [firstCartItem] = wrapper.getAllByTestId(cartItemTestIds.CartItemId);
        const firstCartItemName = getByTestId(
          firstCartItem,
          cartItemTestIds.CartItemLabelId,
        ).textContent;

        // Simulate clicking the TrashIconButton
        fireEvent.click(getByTestId(firstCartItem, cartItemTestIds.TrashIconButtonId));

        // Scan for affected product in the ProductList
        const productListItems = await wrapper.findAllByTestId(
          productCardTestIds.ProductCard,
        );

        const [updatedFirstProduct] = Array.prototype.filter.call(
          productListItems,
          (item: HTMLElement) => (
            item.textContent !== null
            && firstCartItemName !== null
            && item.textContent.indexOf(firstCartItemName) !== -1
          ),
        );

        const finalAvailableQty = extractQtyFromTxt(updatedFirstProduct.textContent);

        // Scan for removed cartSidebar item
        const cartSidebar = wrapper.getByTestId(cartSidebarTestIds.CartSidebarId);
        const matchingCartSidebarProducts = queryAllByText(
          cartSidebar,
          (firstCartItemName === null) ? 'failtest' : firstCartItemName,
        );

        // Assertions
        expect(matchingCartSidebarProducts).toHaveLength(0);
        expect(finalAvailableQty).toEqual(10);

        // Cleanup mocks
        mockInitialState.mockRestore();
      });
    });
  });

  describe('When a product with 1 added size in the CartSidebar has the size qty set to 0', () => {
    describe('Then the affected ProductList item, available size qty will be set to the original amount', () => {
      test('And the affected CartSidebar item will be removed from the cart', async () => {
        // Mocks
        const mockInitialState = jest.spyOn(rootReducerExports as any, 'rootReducerInitialState');
        mockInitialState.mockImplementation(() => singleAddedProductOneSize);

        // Mount wrapper component
        const wrapper = render(
          <MemoryRouter initialEntries={['/']}>
            <App />
          </MemoryRouter>,
        );

        const [firstCartItem] = wrapper.getAllByTestId(cartItemTestIds.CartItemId);
        const firstCartItemName = getByTestId(
          firstCartItem,
          cartItemTestIds.CartItemLabelId,
        ).textContent;

        // Simulate reducing the added qty to 0 on the target CartSidebar item
        const firstCartItemSizeQtyInput = getByTestId(
          firstCartItem,
          cartItemSizeInfoTestIds.CartItemQtyId,
        ) as HTMLInputElement;

        fireEvent.change(
          firstCartItemSizeQtyInput,
          { target: { value: '0' } },
        );
        fireEvent.blur(firstCartItemSizeQtyInput);

        // Scan for affected product in the ProductList
        const productListItems = await wrapper.findAllByTestId(
          productCardTestIds.ProductCard,
        );

        const [updatedFirstProduct] = Array.prototype.filter.call(
          productListItems,
          (item: HTMLElement) => (
            item.textContent !== null
            && firstCartItemName !== null
            && item.textContent.indexOf(firstCartItemName) !== -1
          ),
        );

        const finalAvailableQty = extractQtyFromTxt(updatedFirstProduct.textContent);

        // Scan for removed cartSidebar item
        const cartSidebar = wrapper.getByTestId(cartSidebarTestIds.CartSidebarId);
        const matchingCartSidebarProducts = queryAllByText(
          cartSidebar,
          (firstCartItemName === null) ? 'failtest' : firstCartItemName,
        );

        // Assertions
        expect(matchingCartSidebarProducts).toHaveLength(0);
        expect(finalAvailableQty).toEqual(10);

        // Cleanup mocks
        mockInitialState.mockRestore();
      });
    });
  });

  describe('When a product with 2 added sizes in the CartSidebar has the first size qty set to 0', () => {
    describe('Then the affected ProductList item, first available size qty will be set to the original amount', () => {
      test('And the affected CartSidebar item first size qty will be removed from the cart', async () => {
        // Mocks
        const mockInitialState = jest.spyOn(rootReducerExports as any, 'rootReducerInitialState');
        mockInitialState.mockImplementation(() => singleAddedProductTwoSizes);

        // Mount wrapper component
        const wrapper = render(
          <MemoryRouter initialEntries={['/']}>
            <App />
          </MemoryRouter>,
        );

        const [firstCartItem] = wrapper.getAllByTestId(cartItemTestIds.CartItemId);
        const firstCartItemName = getByTestId(
          firstCartItem,
          cartItemTestIds.CartItemLabelId,
        ).textContent;

        const [firstCartItemFirstSizeElement] = getAllByTestId(
          firstCartItem,
          cartItemSizeInfoTestIds.CartItemSizeId,
        );
        const firstCartItemFirstSize = firstCartItemFirstSizeElement.textContent;

        // Simulate reducing the added qty to 0 on the target CartSidebar item
        const [firstCartItemSizeQtyInput] = getAllByTestId(
          firstCartItem,
          cartItemSizeInfoTestIds.CartItemQtyId,
        ) as [HTMLInputElement];

        fireEvent.change(
          firstCartItemSizeQtyInput,
          { target: { value: '0' } },
        );
        fireEvent.blur(firstCartItemSizeQtyInput);

        // Scan for affected product in the ProductList
        const productListItems = await wrapper.findAllByTestId(
          productCardTestIds.ProductCard,
        );

        const [updatedFirstProduct] = Array.prototype.filter.call(
          productListItems,
          (item: HTMLElement) => (
            item.textContent !== null
            && firstCartItemName !== null
            && item.textContent.indexOf(firstCartItemName) !== -1
          ),
        );

        // Isolate the affected size option in the updatedFirstProduct
        const firstProductSizeOptions = getAllByTestId(
          updatedFirstProduct,
          productCardTestIds.SizePickerOption,
        );
        const [updatedSizeOption] = Array.prototype.filter.call(
          firstProductSizeOptions,
          (sizeOption: HTMLOptionElement) => (
            sizeOption.textContent !== null
            && firstCartItemFirstSize !== null
            && sizeOption.value === firstCartItemFirstSize
          ),
        );

        const finalAvailableQty = extractQtyFromTxt(updatedSizeOption.textContent);

        // Scan for cartSidebar items
        const cartSidebar = wrapper.getByTestId(cartSidebarTestIds.CartSidebarId);
        const matchingCartSidebarProducts = queryAllByText(
          cartSidebar,
          (firstCartItemName === null) ? 'failtest' : firstCartItemName,
        );

        // Scan for remaining added size quantities in the CartSidebar
        const remainingAddedSizes = getAllByTestId(
          firstCartItem,
          cartItemSizeInfoTestIds.CartItemSizeId,
        );

        // Filter out added sizes that don't match the affected one (should be empty list)
        const affectedAddedSize = Array.prototype.filter.call(
          remainingAddedSizes,
          (item: HTMLElement) => (
            item.textContent !== null
            && firstCartItemName !== null
            && item.textContent.indexOf(firstCartItemName) !== -1
          ),
        );

        // Assertions
        expect(affectedAddedSize).toHaveLength(0);
        expect(matchingCartSidebarProducts).toHaveLength(1);
        expect(finalAvailableQty).toEqual(7);

        // Cleanup mocks
        mockInitialState.mockRestore();
      });
    });
  });
});
