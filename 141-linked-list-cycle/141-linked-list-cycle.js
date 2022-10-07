/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function(head) {
  // i = head node of linked list
  // o = true or false depending on cycle or not
  // c = try to solve brute force and then find optimiztions
  // e = if head or head nodes next is null return false
  
  if (!head || !head.next) return false;
    
  let fast = head,
      slow = head;
  
  // loop through the link if fast node is not null and fast next is also not null
  while (fast !== null && fast.next !== null) {
    // reassign fast pointer first
    fast = fast.next.next;   
    // reassign slow pointer second
    slow = slow.next;
    
    // if both pointers node match
      // return true
    if (fast === slow) return true
  }
  // return false if loop breaks  
  return false;
};