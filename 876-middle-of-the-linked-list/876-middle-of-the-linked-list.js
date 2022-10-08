/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var middleNode = function(head) {
  // i = head node of linked list
  // o = middle node of the whole list
  // c = try to find solution and then find an optimized solution
  // e = if there are two middle nodes return the node closest to the tail, 
  
  // keep track of a slow poiter and head pointer
  let slow = head,
      fast = head;
   
  // loop through list until the fast node reaches null
  while (fast && fast.next) {
    // if there is two nodes over fast 
      // reassign fast to the two nodes over
    // otherwise 
    // reassing fast to the next node
    fast = fast.next.next ? fast.next.next : fast.next;

    // make slow pointer move along one node ove
    slow = slow.next;
  }
  // return slow pointer
  return slow
};