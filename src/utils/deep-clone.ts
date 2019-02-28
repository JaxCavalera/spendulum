/**
 * Takes a variable and checks that its constructor (base class) is an "Object"
 * instead of being a "Date", "Null", "Array", etc.
 * @param {object} variable - Should have "Object" as the constructor
 * @return {bool} - Only returns true if "Object" is the variable's constructor
 */
export const isRealObject = (variable: any) => {
  return (
    typeof variable === 'object' &&
    Object.prototype.toString.call(variable).slice(8, -1) === 'Object'
  );
};

/**
* Takes a variable and checks that its constructor (base class) is an "Array"
* instead of being a "Date", "Null", "Object", etc.
* @param {array} variable - Should have "Array" as the constructor
* @return {bool} - Only returns true if "Array" is the variable's constructor
*/
export const isRealArray = (variable: any) => {
  return (
    typeof variable === 'object' &&
    Object.prototype.toString.call(variable).slice(8, -1) === 'Array'
  );
};

/**
* Takes a variable and checks that its constructor (base class) is an "Array"
* instead of being a "Date", "Null", "Object", etc.
* @param {array} variable - Should have "Array" as the constructor
* @return {bool} - Only returns true if "Array" is the variable's constructor
*/
export const isRealDate = (variable: any) => {
  return (
    typeof variable === 'object' &&
    Object.prototype.toString.call(variable).slice(8, -1) === 'Date'
  );
};

/**
 * Recursive function that takes an object and returns a deep clone of it that has no linked references to the original
 * @param {object} originalObj - Current object that needs to have a reference to the original broken
 * @returns {object} - Ultimately it returns a deep clone of the original object passed in
 */
export const deepClone = (originalObj: any) => {
  // Shallow clone the original object breaking the ref to the current level
  const newObj = { ...originalObj };
  const childObjectKeys: string[] = [];
  const childArrayKeys: string[] = [];

  Object.keys(newObj).forEach((key) => {
    if (isRealObject(newObj[key])) {
      childObjectKeys.push(key);
      return;
    }

    if (isRealArray(newObj[key])) {
      childArrayKeys.push(key);
    }
  });

  // Dead end so return the cloned object
  if (!childObjectKeys.length && !childArrayKeys.length) {
    return newObj;
  }

  // At least one child object was found in the newObj being processed
  childObjectKeys.forEach((objKey) => {
    newObj[objKey] = deepClone(newObj[objKey]);
  });

  // At least one child array was found in the newObj being processed
  childArrayKeys.forEach((arrKey) => {
    const [...newArr] = newObj[arrKey];

    // Dereference each child inside the new array
    newObj[arrKey] = newArr.map((item: any) => {
      if (isRealDate(item)) {
        // Item did not need de-referencing
        return item;
      }

      if (item === null) {
        // Item did not need de-referencing
        return item;
      }

      if (typeof item === 'object') {
        return deepClone(item);
      }

      // Item did not need de-referencing
      return item;
    });
  });

  return newObj;
};
