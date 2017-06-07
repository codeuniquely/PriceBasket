//
// Define library to handle writing to a sink (output)
//
const outputProcessor = (sink, utils) => {

  // write the contents to the console
  function log(contents) {
    if (typeof contents !== 'undefined' && contents !== null) {
      sink(contents);
    }
  }

  // write the contents to the console
  function write(results) {

    const {
      subtotal,
      discounts,
      total
    } = results || {};

    // Subtotal is price before discounts are applied
    log(`Subtotal: ${utils.formatPrice(subtotal || 0)}`);

    if (discounts && discounts.length > 0) {
      discounts.forEach( item => {
        log(`${utils.capitalizeFirstLetter(item.name)} ${item.rate} off: -${utils.formatPrice(item.discount)}`);
      });
    } else {
      log('(No offers available)');
    }

    log(`Total price: ${utils.formatPrice(total || 0)}`);
  }

  return {
    log,
    write,
  };

};

export default outputProcessor;
