/**
 * Takes a variable and checks that its constructor (base class) is an "Object"
 * instead of being a "Date", "Null", "Array", etc.
 * @param {object} variable - Should have "Object" as the constructor
 * @return {bool} - Only returns true if "Object" is the variable's constructor
 */
export const isRealObject = (variable: any) => (
  typeof variable === 'object'
  && Object.prototype.toString.call(variable).slice(8, -1) === 'Object'
);

/**
 * Recursive function that takes a target item and returns a deep clone of it
 * that has no linked references to the original
 * @param {any} target - Variable that needs to have all references to the original broken
 * @returns {any} - Ultimately it returns a deep clone of the original target variable
 */
export const deepClone = (target: any) => {
  const usableTarget = Array.isArray(target) || isRealObject(target);

  if (!usableTarget || !Object.keys(target).length) {
    // Avoid unnecessary processing of non-iterable or empty targets
    return target;
  }

  // Shallow clone the current level of the target object/array so refs to the original are broken
  const newTarget = Array.isArray(target) ? [...target] : { ...target };

  // Create a temp list of keys in the current level of the target assigned to an array or object
  const iterableKeys = Object.keys(newTarget).filter(key => (
    Array.isArray(newTarget[key]) || isRealObject(newTarget[key])
  ));

  while (iterableKeys.length) {
    const nextKey = iterableKeys.shift();

    if (nextKey) {
      newTarget[nextKey] = deepClone(newTarget[nextKey]);
    }
  }

  return newTarget;
};
