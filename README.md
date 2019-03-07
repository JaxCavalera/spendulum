This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Contents
[Introduction](#introduction)   
[Summary](#summary)   
&nbsp;&nbsp;&nbsp;&nbsp;[Hooks vs MobX vs Redux](#hooks-vs-mobx-vs-redux)    
&nbsp;&nbsp;&nbsp;&nbsp;[Redux Pattern Adjustments](#redux-pattern-adjustments)    
&nbsp;&nbsp;&nbsp;&nbsp;[Validating Reducer Shapes](#validating-reducer-shapes)    
&nbsp;&nbsp;&nbsp;&nbsp;[Final Thoughts on Hooks](#final-thoughts-on-hooks)    
[Available Scripts](#available-scripts)    
[Developer Notes](#developer-notes---goals-for-v1)    

# Introduction
This project is built as a POC to identify a suitable designe pattern that can leverage React hooks. The design pattern is used to power a product called **"Spendulum"**.

Spendulum is a fictional product I made up that when finished would allow users to try snap up items while they are listed at a lower price point. Listed items will randomly decrease / increase in value between fixed caps at each end in an effort to further gamify the shopping experience.

A bundle discount is applied based on the number of items in a user's cart at the time of purchase which encourages bulk purchases where some items a user may want to buy won't be discounted as low as others.

The moment an item is added to the cart it's purchase price will be locked in for the next 15 minutes. Removing an item from the cart resets the purchase price to the currently listed value.

[Back To Top](#contents)

---

# Summary
Below are key learnings from working with the combination of, **Functional Components** and **React Hooks** without any additional state management tools. Uses [JSON Bin](https://jsonbin.io/) as a restful JSON storage / retrieval system.

## Hooks vs MobX vs Redux
The main benefits to working with MobX over Redux have been the reduction in boilerplate, easier integration with async functionality and the ability to wrap a stateless functional component with `inject` and `observer` turning them into stateful functional components.

Hooks provide a lot of these same benefits using vanilla React, but there has been a noticed performance decrease due to unnecessary re-renders which MobX is great at preventing.

For large projects, whilst hooks can scale similar to that of Redux, in terms of boilerplate, hooks would sit somewhere in between Redux and MobX.

## Redux Pattern Adjustments
The standard redux pattern does share some similarities with things like `useReducer` and `useContext` but to ensure that state updates only trigger re-renders in affected components where `useContext` gets called, it requires some additional work.

The main differences are that there is no requirement for actionCreator boilerplate (though I believe having them would make it easier to dispatch the same actionType in several places). If `useContext` isn't called by a component, it can benefit from being wrapped by `React.memo`. There is also a stronger emphasis on taking advantage of `useState` and `useEffect` when dealing with internal state changes.

#### Validating Reducer Shapes
Typescript is not able to validate the shape of callback functions from where they are being called so this needs to happen before they get passed in as nested callbacks.

Unfortunately, typescript is only able to determine the type assigned to a function or method when it is called. Finding the right way to validate the shape of a reducer function proved to be quite a challenge.

After doing some research I was directed to the following design pattern which can be used to: 
- Extract out a generic type used to represent the parameter with an identical type to the one a method returns
- Assign the generic type to the target parameter
- Define any other params in the method's structure
- Assign the generic type as the return type for the method
(a.k.a Mapped types)

If dealing with an object as the (param === return) target type, see https://stackoverflow.com/a/54850697/4181923

## Final Thoughts on Hooks
Being able to use functional components (FC's) instead of classes improves readability, no longer having to manage things like the binding of `this`.

If testing logic at the functional unit level vs component level, both classes and FC's benefit from extracting the body of the logic outside the component and using an `eventHandlerWrapper` to call them. Classes so you don't need to initialise to access the methods and FC's because there would be no way to access them otherwise.

[Back To Top](#contents)

---

# Available Scripts
In the project directory, you can run:

## `yarn start | npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

## `yarn test | npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## `yarn build | npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## `yarn eject | npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**
This should be an absolute last resort, preference using the config-overrides npm package if possible.

[Back To Top](#contents)

---

## Developer Notes - (Goals for v1)
#### Todo List
- Build cart sidebar
    - Adjust qty of products in cart => NEXT UP
    - Display Price timer for cart items
    - Handle removal directly from cart
- Implement basic account login using generic credentials like `username`, `password1` as a way for testing ability to add new products in via a UI.

#### Bugs
- Identified underlying cause of a bug where it takes a few remounts before all product cards display their correct, fixed timers. This is caused by a race condition when the reducer attempts to update the same array for each product if 2 or more need an update at the same moment in time.
    - SOLUTION: Implemented a really basic version of the Micro Store pattern:
        - Any time there is an array of objects mapped to components, assign each object to a new property on the parent store
        - Use a unique identifier per object as the microStoreId (UUID, value, etc.)
        - Keep an array of microStoreIds to easily map over and reference associated microStore object
        - Interact with microStore data using the associated microStoreId and 4 dedicated reducer ActionTypes:
            - `ASSIGN_MICROSTORE` -> Used for replacing entire microStore object (create / full update)
            - `REMOVE_MICROSTORE` -> Removes the specified microStore property + object from the parent store
            - `UPDATE_MICROSTORE_VALUE` -> Update the value of a specific property inside a target microStore object
            - `UPDATE_PRODUCT_MICROSTORE_ID_LIST` -> Updates the list of microStoreIds
    - Drawbacks vs using the microStore pattern in mobx
        - Updating any value in a microStore causes a re-render on all components hooked up to the shared reducer (mobx is very good at only triggering component updates on specific elements affected directly by the updating of a target microStore property value.
        - Aside from slower performance, it's not as straight-forward to update the value of a specific property in a microStore as it is in mobx
        - There may be a way to prevent all components re-rendering if a reducer could be dynamically created for individual microStores at runtime.

#### Security
Consider using socket.io with an express server to manage price, availableSizes & priceTimer calculations. Pushing down to clients on update alternatively some more convoluted client-side techniques could be employed to make forged requests more difficult (see below).

Memoize the last 5 prices for each product inside the API fn responsible for submitting an order (Planned for v2)
- Keeps the list much harder to mess with clientside
- Can reject orders where the price does not match a tracked value
- Can reject orders where more than 5 prices are listed since there is a min duration of (currently 5 mins) between a price change and cart items only freeze their added price point for (currently 20 mins) after the time of being added to the cart

#### Tests
Currently the majority of functionality is not covered by any unit / integration / snapshot tests, aside from the most critical sections in the application i.e. combineReducers helper function, deepClone and similar.

[Back To Top](#contents)

---
