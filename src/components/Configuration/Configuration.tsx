import React, { useState, useContext } from 'react';

// Error Handlers
import { Link } from 'react-router-dom';
import ErrorBoundary from '../../utils/ErrorBoundary';

// Contexts
// import { StoreContext, StoreDispatch } from '../../container/rootReducer';
// import { ConfigurationActionTypes } from './Configuration-models';

// Child Components
import { AccountLogin } from '../AccountLogin/AccountLogin';

// Components
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';

// Styles
import {
  ConfigurationWrapper,
} from './Configuration-styles';

/**
 * TODO
 *
 * - add configuration reducer to rootReducer
 * - use configApis context triggering a refreshProductList action
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
  // const store = useContext(StoreContext);
  // const dispatch = useContext(StoreDispatch);

  const [isLoading, updateIsLoading] = useState(true);

  return (
    <ErrorBoundary>
      <ConfigurationWrapper>
        {
          isLoading ? (
            <LoadingSpinner msg="Loading current products..." />
          ) : (
            <div>Products go here</div>
          )
        }
      </ConfigurationWrapper>
    </ErrorBoundary>
  );
};
