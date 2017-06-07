//
// library holds the 'business logic' for how discounts are applied
//
// ===============================================================
// The returned structure is:
// {
//   subtotal: 3.10,
//   discounts: [
//     { name:'Apples', rate:'10%', discount:-10 },
//     { name:'Bread ', rate:'50%', discount:-40 }
//   ],
//   total: 2.60
// }
// ===============================================================
const applyDiscounts = (basket, discountRules) => {

  const results = {
    subtotal: 0,
    discounts: [],
    total: 0
  };

  // Get the contents of the shopping basket
  const contents = basket.contents();

  // Subtotal is the price based on the basket items (without discount)
  results.subtotal = basket.total();

  // try all the 'rules' in turn, to calculate the total discount
  let discount = 0;
  Object.keys(discountRules).forEach( name => {
    // invoke the 'named' rule on the basket contents
    const rule = discountRules[name](contents);
    // but only 'apply' a rule if it generates a discount
    if (rule.discount > 0) {
      discount += rule.discount;
      results.discounts.push(rule);
    }
  });

  // 'total price' is after discount is applied, to 2 dp
  results.total = Math.round((results.subtotal - discount)*100) / 100;

  // return the results structure
  return results;
};

export default applyDiscounts;
