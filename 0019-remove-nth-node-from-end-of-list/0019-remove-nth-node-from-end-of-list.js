/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
  // i: linked list and interger
  // o: head of linked list
  // c: find solution, then optimize
  // e: assume there will be at least one node
  // if there is one node than return null;
  if (!head.next) return null;
  
  // keep track of scout pointer node and starting node
  let curNode = head,
      scoutNode = head;
  while (n > 0) {
    scoutNode = scoutNode.next;
    n--;
  }
  
  while (scoutNode && scoutNode.next) {
  // while scouts next node is true
    // cycle through list
    scoutNode = scoutNode.next;
    curNode = curNode.next;
  }
  // alter current nodes next to equal the second next node
  if (curNode === head && !scoutNode) {
    head = head.next;
  } else {
    curNode.next = curNode.next.next;    
  }
  
  return head;
};