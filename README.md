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

A bundle discount is applied based on the number of items in a user's cart at the time of purchase which encourages bulk purchases where some items they want to buy may not be discounted a low as others.

The moment an item is added to the cart it's purchase price will be locked in for the next 15 minutes. Removing an item from the cart resets the purchase price to the currently listed value.

[Back To Top](#contents)

---

# Summary
Below are key learnings from working with the combination of **styled-components**, **functional components**, **React hooks** and **react-router** without any additional state management tools. Uses [JSON Bin](https://jsonbin.io/) as a restful JSON storage / retrieval system.

## Redux pattern adjustments
The standard redux pattern does share some similarities with things like `useReducer` and `useContext` but to ensure that state updates only trigger re-renders in affected components where `useContext` gets called, it requires some additional work.

The main differences are that there is not requirement for actionCreator boilerplate and if `useContext` isn't called by a component, it can benefit from being wrapped by `React.memo`. There is also a stronger emphasis on taking advantage of `useState`, `useEffect` and `useMemo` (for potential optimisation) when dealing with internal state changes.

## Simplification
Being able to use functional components (FC's) instead of classes improves readability no longer having to manage binding this.

If testing logic at the functional unit level vs component level, both classes and FC's benefit from extracting the body of the logic outside the component and using an eventHandlerWrapper to call them. (classes so you don't need to initialise to access the methods and FC's coz there would be no way to acces them otherwise).

## Validating reducer shapes
Typescript is not able to validate the shape of callback functions from where they are being called so this needs to happen before they get passed in as nested callbacks.

Unfortunately, typescript is only able to determine the type assigned to a function or method when it is called. Finding the right way to validate the shape of a reducer function proved to be quite a challenge.

After doing some research I was directed to the following design pattern which can be used to: 
- Extract out a generic type used to represent the parameter with an identical type to the one a method returns
- Assign the generic type to the target parameter
- Define any other params in the method's structure
- Assign the generic type as the return type for the method

If dealing with an object as the (param === return) target type, see https://stackoverflow.com/a/54850697/4181923

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
