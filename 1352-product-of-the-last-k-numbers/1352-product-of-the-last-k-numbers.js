
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
  let lastInd = this.array.length - 1;
  let product = this.array[lastInd];
  
  while (k > 1) {
    lastInd--;
    product *= this.array[lastInd];
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