//
// Defines a lirary of possible discount rules that can be applied
//
const discountRules = (priceList, utils) => {

  // ===============================================================
  // 1 bread is discounted at 50% for every 2 cans of soup
  // ===============================================================
  function everyTwoTinsOfSoupMakesOneBreadHalfPrice(contents) {

    const numberOfSoups = contents.soup || 0;
    const numberOfbread = contents.bread || 0;

    // There must be 2 tins of soup for every bread discount;
    const numberOfQualifyingDiscounts = Math.floor(numberOfSoups / 2);

    // What is the actual number of discounts that can apply
    const discountsThatApply = Math.min(numberOfQualifyingDiscounts, numberOfbread);

    // calculate and return the discount for bread
    const discount = utils.roundDown((priceList.bread || 0) * 0.5) * discountsThatApply;
    return { name:'Bread ', rate:'50%', discount };
  }

  // ===============================================================
  // all bags of apples are discounted at 10%
  // ===============================================================
  function discountBagsOfApples(contents) {
    const discountsThatApply = contents.apples || 0;

    // calculate and return the discount for apples
    const discount = utils.roundDown((priceList.apples || 0) * 0.1) * discountsThatApply;
    return { name:'Apples', rate:'10%', discount };
  }

  return {
    everyTwoTinsOfSoupMakesOneBreadHalfPrice,
    discountBagsOfApples,
  };

};

export default discountRules;
