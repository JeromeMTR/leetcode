
var ProductOfNumbers = function() {
  this.array = [];
};

/** 
 * @param {number} num
 * @return {void}
 */
ProductOfNumbers.prototype.add = function(num) {
  this.array.push(num);
};

/** 
 * @param {number} k
 * @return {number}
 */
ProductOfNumbers.prototype.getProduct = function(k) {
  let product = 1;
  let lastInd = this.array.length - 1;
  while (k >= 1) {
    product *= this.array[lastInd];
    lastInd--;
    k--;
  }
  return product;
};

/** 
 * Your ProductOfNumbers object will be instantiated and called as such:
 * var obj = new ProductOfNumbers()
 * obj.add(num)
 * var param_2 = obj.getProduct(k)
 */