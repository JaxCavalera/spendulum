import React, { useContext } from 'react';

// Error handlers
import ErrorBoundary from '../../utils/ErrorBoundary';

// Contexts
import { StoreContext, StoreDispatch } from '../../container/rootReducer';
import { ConfigApisContext } from '../../apis/api-contexts';

// Components
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';

// Styles
import { SectionParagraph, SpacedStrong, BasicButton } from '../../utils/shared-styles';
import {
  ConfigurationWrapper, CurrentProductsList,
} from './Configuration-styles';

// Logic
import { useGetCurrentProducts, handleAddProductOnClick } from './Configuration-logic';
import { ProductInfo } from '../../utils/product-info-helpers';
import { ProductSettings } from '../ProductSettings/ProductSettings';
import { ProductEditorPopup } from '../ProductEditorPopup/ProductEditorPopup';

/**
 * TODO
 * - display products mapping over microstore ids
 *     - edit
 *     - delete
 * - include add product button below the list
 * - list needs max height so add btn sits below this point
 * - Create the EditProduct component - inputs for key ProductInfo data
 * - autogen the rest, replaces the products list when creating / editing
 * - has save and cancel btns in edit mode -
 * dynamic title use prop for Create / Edit ProductNameHere
 */

export const Configuration = () => {
  const {
    configurationStore,
    configurationStore: {
      configProductMicroStoreIds,
      activeProductStoreId,
    },
  } = useContext(StoreContext);

  const dispatch = useContext(StoreDispatch);
  const configApis = useContext(ConfigApisContext);
  const isLoading = useGetCurrentProducts(dispatch, configApis, configurationStore);

  // Event handlers
  const callHandleAddProductOnClick = () => {
    handleAddProductOnClick(dispatch);
  };

  return (
    <ErrorBoundary>
      <ConfigurationWrapper>
        {
          isLoading
          && <LoadingSpinner msg="Loading current products..." />
        }
        {
          !isLoading
          && (
          <CurrentProductsList>
            {
              configProductMicroStoreIds.length ? (
                configProductMicroStoreIds.map(microStoreId => {
                  const microStore: ProductInfo = configurationStore[microStoreId];
                  return !!microStore && <ProductSettings key={microStoreId} data={microStore} />;
                })
              ) : (
                <SectionParagraph marginOverride="0 0 1rem">
                  <span>No available products found, click the</span>
                  <SpacedStrong>Add Product</SpacedStrong>
                  <span>button to begin.</span>
                </SectionParagraph>
              )
            }
            <BasicButton onClick={callHandleAddProductOnClick}>
              Add Product
            </BasicButton>
          </CurrentProductsList>
          )
        }
        {
          !!activeProductStoreId
          && (
            <ProductEditorPopup
              initialProductData={configurationStore[activeProductStoreId]}
            />
          )
        }
      </ConfigurationWrapper>
    </ErrorBoundary>
  );
};
