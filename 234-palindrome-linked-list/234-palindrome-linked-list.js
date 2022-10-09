/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function(head) {
  // i = head of linked list
  // o = true or false depending palindrome
  // c = find optimized solution
  // e = if head is null or head.next is null return false
  
  // keep track of current node
  let node = head,
      str = '';
  // push everything into string
  while (node) {
    str += node.val;
    node = node.next;
  }
  // reference two pointers front and back
  let front = 0,
      back = str.length - 1
  
  // loop until front and back is equal to each other
  while (front <= back) {
    // if front and back elements don't match
    if (str[front] !== str[back]) return false;
      // return false
    // increment front and decrement back
    front++;
    back--;
  }
  // return true if loop breaks
  return true;
};