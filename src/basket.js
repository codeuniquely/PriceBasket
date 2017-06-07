//
// Basket to hold the counts of various shopping items picked
// items are checked against priceList before being added ...
//
const basket = (priceList, utils) => {

  // contains the counts for each basket item
  let items = {};

  // standardize the way item names are represented and validiate them.
  function checkIfItemAllowed(name){
    let n = utils.standardizeName(name);
    if (priceList[n]){
      return n;
    } else {
      return false;
    }
  }

  // empty the basket of contents
  function empty(){
    items = {};
    return this;
  }

  // add a single item, after checking if its allowed
  function addItem(name){
    const n = checkIfItemAllowed(name);
    if (!n){
      empty();
      throw new TypeError(`Item "${name}", is not in the price list and cannot be added to basket`);
    }

    // increment the count of the basket 'property'
    // that matching the stadardized version of the
    // name that was passed in
    if (!items[n]){
      items[n] = 1;
    } else {
      items[n] += 1;
    }

    return this;
  }

  // Add items to the basket, from a list of items
  function addItemsFromList(list) {
    if (typeof list !== 'undefined' && list !== null) {
      list.forEach(item => {
        if (item.match(/\w/)) {
          addItem(item);
        }
      });
    }
  }

  // Return new object rather than reference
  function contents(){
    return utils.getJsonObject(items);
  }

  // Get the 'non discounted' price of the basket items
  function total(){
    let total = 0;
    Object.keys(items).forEach( item => {
      total += (priceList[item] * items[item]);
    });
    return total;
  }

  // function removeItem(name) {
  //   const n = checkIfItemAllowed(name);
  //   if (!n){
  //     throw new TypeError(`Item "${name}", is not in the price list and cannot be removed from basket`);
  //   }
  //
  //   if (items[n] && items[n] > 0){
  //     items[n] -= 1;
  //   }
  //   if (items[n] < 1) {
  //     items[n] = undefined;
  //   }
  //
  //   return items;
  // }

  return {
    empty,
    addItem,
    addItemsFromList,
    contents,
    total
    // removeItem,
  };

};

export default basket;
