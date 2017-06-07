//
// Define a library to process a list of inputs from a source
//
const inputsProcessor = (inputs) => {

  // splits input into a list of separate items, where the
  // split happens on newline, space, commas or semicolons
  // whilst this is beyond the requirements it's sensible.
  function get() {
    if (typeof inputs !== 'undefined' && inputs !== null && inputs.length > 2) {
      const list = inputs.slice(2).join(' ').trim().split(/[\n\s,;]+/);
      return list;
    }
    return [];
  }

  return {
    get,
  };

};

export default inputsProcessor;
