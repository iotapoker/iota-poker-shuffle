/**
 * Shuffles array.
 *
 * @param {string[]} array
 * @return {string[]}
 */
const shuffle = (array: Array<string>): Array<string> => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

export {shuffle};
