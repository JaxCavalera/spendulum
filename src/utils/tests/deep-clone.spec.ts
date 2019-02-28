import { deepClone } from '../deep-clone';

// deepClone
describe('Given deepClone is called with an object nested inside another object several times over', () => {
  describe('When a deep nested property value on the cloned object is modified', () => {
    test('Then the matching property on the original object will NOT be modified', () => {
      const nestedOriginalObj = {
        top: {
          middle: {
            moreMiddle: {
              deeper: {
                bottom: [1, 2, 3, 4, 5],
              },
            },
          },
        },
      };

      const clonedObj = deepClone(nestedOriginalObj);

      clonedObj.top.middle.moreMiddle.deeper.bottom.push(6);

      expect(nestedOriginalObj).not.toEqual(clonedObj);
      expect(nestedOriginalObj).not.toEqual(clonedObj);
      expect(nestedOriginalObj.top.middle.moreMiddle.deeper.bottom)
        .not.toHaveLength(clonedObj.top.middle.moreMiddle.deeper.bottom.length);
    });
  });

  describe('When no properties or values are modified on either the original or the clone', () => {
    test('Then both objects will have an identical structure', () => {
      const nestedOriginalObj = {
        top: {
          middle: {
            moreMiddle: {
              deeper: {
                someDate: new Date,
                andMethod: function (a: number) { return a + 1; },
                bottom: [1, 2, 3, 4, {
                  and: {
                    even: {
                      deeper: [
                        new Date,
                        1,
                        2,
                        function (c: number) { return c - 1; },
                        'u',
                        null,
                        Number(7),
                        {
                          just: {
                            to: {
                              be: {
                                sure: 'ok maybe too far :)',
                              },
                            },
                          },
                        }
                      ],
                    },
                  },
                }],
              },
            },
          },
        },
      };

      const clonedObj = deepClone(nestedOriginalObj);

      expect(nestedOriginalObj).toEqual(clonedObj);
    });
  });
});

// Sanity check runnning identical test up against a non cloned object
describe('Given a new variable is assigned the value of a deeply nexted object', () => {
  describe('When a deep nested property value on the assigned object is modified', () => {
    test('Then the matching property on the original object will also be modified', () => {
      const nestedOriginalObj = {
        top: {
          middle: {
            moreMiddle: {
              deeper: {
                bottom: [1, 2, 3, 4, 5],
              },
            },
          },
        },
      };

      const referenceObj = nestedOriginalObj;

      referenceObj.top.middle.moreMiddle.deeper.bottom.push(6);

      expect(nestedOriginalObj).toEqual(referenceObj);
      expect(nestedOriginalObj).toEqual(referenceObj);
      expect(nestedOriginalObj.top.middle.moreMiddle.deeper.bottom)
        .toHaveLength(referenceObj.top.middle.moreMiddle.deeper.bottom.length);
    });
  });
});
