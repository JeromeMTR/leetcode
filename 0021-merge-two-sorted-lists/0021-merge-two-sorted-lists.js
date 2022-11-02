/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function(list1, list2) {
  // i: 2 sorted linked lists
  // o: merged list sorted
  // c: find a solution and then optmize
  // e: can be different lengths, if both are empty return null node
//   if (!list1) return list2;
//   if (!list2) return list1;
  
//   let resultHead;
//   let curNode = list1.val <= list2.val ? list1 : list2;
//   resultHead = curNode;
  
//   while (list1 && list2) {
//     if (list1.val <= list2.val) {
//       curNode = list1;
//       list1 = list1.next;
//     } else if (list2.val < list1.val) {
//       curNode = list2;
//       list2 = list2.next;
//     }
//   }
  
//   return resultHead;
  if (!list1 || !list2 ) return list1 || list2
    
    let node = list1 
    let node2 = list2
    
    let res = node.val <= node2.val ? node : node2
    while (node && node2) {
        if (node.val <= node2.val) {
            while (node && node.next && node.next.val <= node2.val) {
                node = node.next
            }
            const nodeNext = node.next 
            node.next = node2 
            node = nodeNext
        } else {
            while (node2 && node2.next && node2.next.val <= node.val) {
                node2 = node2.next
            }
            const nodeNext = node2.next 
            node2.next = node 
            node2 = nodeNext
        }
    }
    
    return res
};