import React, { useContext } from 'react';

// Error Handlers
import ErrorBoundary from '../../utils/ErrorBoundary';

// Contexts
import { StoreContext, StoreDispatch } from '../../container/rootReducer';
import { ConfigApisContext } from '../../apis/api-contexts';

// Components
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';

// Styles
import {
  ConfigurationWrapper,
} from './Configuration-styles';

// Logic
import { useUpdateCurrentProducts } from './Configuration-logic';

/**
 * TODO
 * - display products mapping over microstore ids
 *     - edit
 *     - delete
 * - include add product button below the list
 * - list needs max height so add btn sits below this point
 * - Create the EditProduct component - inputs for key ProductInfo data
 * - autogen the rest, replaces the products list when creating / editing
 * - has save and cancel btns in edit mode - dynamic title use prop for Create / Edit ProductNameHere
 */

export const Configuration = () => {
  const {
    configurationStore,
    configurationStore: {
      productMicroStoreIds,
    },
  } = useContext(StoreContext);

  const dispatch = useContext(StoreDispatch);
  const configApis = useContext(ConfigApisContext);
  const isLoading = useUpdateCurrentProducts(dispatch, configApis, configurationStore);

  return (
    <ErrorBoundary>
      <ConfigurationWrapper>
        {
          isLoading ? (
            <LoadingSpinner msg="Loading current products..." />
          ) : (
            <p>config</p>
          )
        }
      </ConfigurationWrapper>
    </ErrorBoundary>
  );
};
