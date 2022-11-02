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
var deleteDuplicates = function(head) {
  // i: head of linked list
  // o: removed duplicates in linked list
  // c: find solution and then optmize
  // e: assume that the list is sorted, if head is null return head
  if (!head) return head;
  
  let curNode = head;
  
  while (curNode.next) {
    if (curNode.val === curNode.next.val) {
      curNode.next = curNode.next.next;
    } else {
      curNode = curNode.next;
    }
  }
  
  return head;
};