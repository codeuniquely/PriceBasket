/* global process console */

import utils from './utils';
import priceList from './priceList';
import inputsProcessor from './inputsProcessor';
import outputProcessor from './outputProcessor';
import discountRules from './discountRules';
import applyDiscounts from './applyDiscounts';
import basket from './basket';

// instantiate a 'utils' object
const utilities = utils();

// instantiate a inputs processor - with process.argv as the input source
const inputs = inputsProcessor(process.argv);

// instantiate a 'shopping basket'
const shoppingBasket = basket(priceList, utilities);

// instantiate the discount rules library
const rules = discountRules(priceList, utilities);

// instantiate an output processor - with console.log as the output sink
const outputs = outputProcessor(console.log, utilities); // eslint-disable-line no-console

try {

  // empty the shopping basket - not strictly needed
  shoppingBasket.empty();

  // Get the inputs that were passed in
  const list = inputs.get();

  // Add the items to the basket
  shoppingBasket.addItemsFromList(list);

  // Apply 'discounts' to the shopping basket
  const results = applyDiscounts(shoppingBasket, rules);

  // Write the output
  outputs.write(results);
  process.exit(0);

} catch( e ) {

  // write the 'error' message
  outputs.log(e.message);
  process.exit(1);

}
