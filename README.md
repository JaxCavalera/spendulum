This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Contents
[Available Scripts](#available-scripts)   
[Introduction](#introduction)   
[Summary](#summary)   
&nbsp;&nbsp;&nbsp;&nbsp;[Redux pattern needs adjusting](#redux-pattern-needs-adjusting)    

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

# Introduction
This project is built as a POC to identify design patterns leveraging React hooks. It is a product called **"Spendulum"**, and allows users to try snap up items while they are temporarily selling at a price that will randomly decrease / increase in value.

A bundle discount is applied based on the number of items in a user's cart at the time of purchase which encourages bulk purchases where some items they want to buy may not be discounted as low as others.

The moment an item is added to the cart it's purchase price will be locked in for the next 15 minutes. Removing an item from the cart resets the purchase price to the currently listed value.

[Back To Top](#contents)

---

# Summary
Below are key learnings from working with the combination of **styled-components**, **functional components**, **React hooks** and **react-router** without any additional state management tools. Uses [JSON Bin](https://jsonbin.io/) as a restful JSON storage / retrieval system.

## Styled components
Styled components have helped to keep the JSX a lot cleaner without preventing the addition of classNames if necessary for 3rd party integrations or higher level integration testing (i.e. selenium). Due to these components being defined via a template literal syntax it allowed for a reduction in css styles for handling things like toggled states which can now be driving via variables directly.

## Hooks vs MobX
The main benefits to working with MobX over Redux have been the reduction in boilerplate, easier integration with async functionality and the ability to wrap a stateless functional component with `inject` and `observer` turning them into stateful functional components.

Hooks provide a lot of these same benefits using vanilla React, however the verdict is still not in regarding performance between MobX's ability to quickly detect deeply nested changes in a store.

For large projects, whilst hooks can scale similar to that of Redux, in terms of boilerplate, hooks would sit somewhere in between Redux and MobX.

## Storage, retrieval and basic security
In a production version of this application it would be better to use a more secure database solution that has a dedicated backend using an express server in conjunction with popular user authentication such as passport. It would also be ideal to verify transactions on sales to guard against client-side exploitation.

e.g. Injecting the lowest possible price on each item in the cart should be statistically impossible.

## Redux pattern adjustments
The standard redux pattern does share some similarities with things like `useReducer` and `useContext` but to ensure that state updates only trigger re-renders in affected components where `useContext` gets called, it requires some additional work.

The main differences are that there is no requirement for actionCreator boilerplate and if `useContext` isn't called by a component, it can benefit from being wrapped by `React.memo`. There is also a stronger emphasis on taking advantage of `useState`, `useEffect` and `useMemo` (for potential optimisation) when dealing with internal state changes.

## Simplification
Being able to use functional components (FC's) instead of classes improves readability, no longer having to manage things like the binding of `this`.

If testing logic at the functional unit level vs component level, both classes and FC's benefit from extracting the body of the logic outside the component and using an `eventHandlerWrapper` to call them. Classes so you don't need to initialise to access the methods and FC's because there would be no way to access them otherwise.

## Validating reducer shapes
Typescript is not able to validate the shape of callback functions from where they are being called so this needs to happen before they get passed in as nested callbacks.

Unfortunately, typescript is only able to determine the type assigned to a function or method when it is called. Finding the right way to validate the shape of a reducer function proved to be quite a challenge.

After doing some research I was directed to the following design pattern which can be used to: 
- Extract out a generic type used to represent the parameter with an identical type to the one a method returns
- Assign the generic type to the target parameter
- Define any other params in the method's structure
- Assign the generic type as the return type for the method

If dealing with an object as the (param === return) target type, see https://stackoverflow.com/a/54850697/4181923

## Typescript development experience
Quite often I would find myself having to do gymnastics in order to let typescript know what I already knew, (that the code was working as required). Whilst this does add an overhead to developing, and can feel like a drain on productivity, once implemented correctly it provides a little more security and helps when the time comes for refactoring.

Even with strictly typed code, this did not prevent bugs from cropping up. It isn't something that could be used as a substitute for tests, it did provide a clean way of managing propTypes. Defining interfaces up front helped as a way to almost pseudo-code out the structures facilitating improved code quality in terms of design patterns.

On average it probably results in writing about the same quantity of code, exchanging logic to confirm something is safe to reference, call or perform some other operation on at runtime vs handling this task at compile time. I suspect the more fluent a developer becomes at using typescript, the more the scales begin to tip in its favour.

[Back To Top](#contents)

---


## Developer Notes
- Build product card
    - name => DONE
    - price => fixed price only atm not dynamic
    - image => DONE
    - add to cart btn => DONE
    - min price (hidden)
    - max price (hidden)
    - price change timer (hidden in v1)
- Bypass API Calls using mock data for a list of products
- Build cart sidebar
    - qty => handle in cart sidebar
    - Implement handler to add product qty to cart it should appear in sidebar
