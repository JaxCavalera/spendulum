This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Contents
[Introduction](#introduction)   
[Summary](#summary)   
&nbsp;&nbsp;&nbsp;&nbsp;[Hooks vs MobX vs Redux](#hooks-vs-mobx-vs-redux)    
&nbsp;&nbsp;&nbsp;&nbsp;[Redux Pattern Adjustments](#redux-pattern-adjustments)    
&nbsp;&nbsp;&nbsp;&nbsp;[Validating Reducer Shapes](#validating-reducer-shapes)    
&nbsp;&nbsp;&nbsp;&nbsp;[Final Thoughts on Hooks](#final-thoughts-on-hooks)    
[Available Scripts](#available-scripts)    

# Introduction
This project is built as a POC to identify a suitable designe pattern that can leverage React hooks. The design pattern is used to power a product called **"Spendulum"**.

Spendulum is a fictional product I made up that when finished would allow users to try snap up items while they are listed at a lower price point. Listed items will randomly decrease / increase in value between fixed caps at each end in an effort to further gamify the shopping experience.

A bundle discount is applied based on the number of items in a user's cart at the time of purchase which encourages bulk purchases where some items a user may want to buy won't be discounted as low as others.

The moment an item is added to the cart it's purchase price will be locked in for the next 20 minutes. Removing an item from the cart resets the purchase price to the currently listed value.

[Live Demo](https://spendulum.herokuapp.com/)

[Back To Top](#contents)

---

# Summary
Below are key learnings from working with the combination of, **Functional Components** and **React Hooks** without any additional state management tools. Uses [MossByte](https://mossbyte.com/) as a restful JSON storage / retrieval system.

## Hooks vs MobX vs Redux
The main benefits to working with MobX over Redux have been the reduction in boilerplate, easier integration with async functionality and the ability to wrap a stateless functional component with `inject` and `observer` turning them into stateful functional components.

Hooks provide a lot of these same benefits using vanilla React, but there has been a noticed performance decrease due to unnecessary re-renders which MobX is great at preventing.

For large projects, whilst hooks can scale similar to that of Redux, in terms of boilerplate, hooks would sit somewhere in between Redux and MobX.

## Redux Pattern Adjustments
The standard redux pattern does share some similarities with things like `useReducer` and `useContext` but to ensure that state updates only trigger re-renders in affected components where `useContext` gets called, it requires some additional work.

The main differences are that there is no requirement for actionCreator boilerplate. If `useContext` isn't called by a component, it can benefit from being wrapped by `React.memo`. There is also a stronger emphasis on taking advantage of `useState` and `useEffect` when dealing with internal state changes.

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
