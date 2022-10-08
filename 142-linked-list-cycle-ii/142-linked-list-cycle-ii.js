/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
function detectCycle(head) {
  // i = head node of linked list
  // o = return index start of the cycle in linked list
  // c = find working solution and then find optmized solution
  // e = if head node or head node next is null return null;
  if (!head || !head.next) return null;
  
  // declare needed var
  let length,
      slow = head,
      fast = head;
  // loop through the list until fast node is null and node next is null
  while (fast && fast.next) {
    // make the scout pointer move first
    fast = fast.next.next;
    // make the trailer pointer move after
    slow = slow.next;
    // check if the nodes match 
    if (slow === fast) {
      // invoke helper function that finds the length
      length = findLength(slow);
      fast = head;
      slow = head;
      break;
    }
  }
  
  while (length > 0) {
    fast = fast.next;
    length--;
  }
  
  while (fast !== slow) {
    // loop through list while condition is true
    // move each pointer iteration next
    if (fast === null) return null;
    fast = fast.next;
    slow = slow.next;
  }
  
  return slow;
};

// create helper function to find length
function findLength(node) {
  let current = node,
       length = 0;
  while(true) {
    current = current.next;
    length++;
    if (current === node) break;
  }
  return length; 
}
