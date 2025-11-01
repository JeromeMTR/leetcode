// Definition for singly-linked list node.
class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val: number, next: ListNode | null = null) {
        this.val = val;
        this.next = next;
    }
}

/**
 * Remove nodes from linked list whose values are in nums set.
 * @param nums The array of values to remove
 * @param head The head of the linked list
 * @returns The head of the modified linked list
 */
function removeNodes(nums: number[], head: ListNode | null): ListNode | null {
    // Step 1: Put nums into a Set for fast O(1) lookups
    const toRemove = new Set(nums);

    // Step 2: Use a dummy head node to simplify edge removals
    const dummy = new ListNode(0, head);
    let prev = dummy;
    let curr = head;

    // Step 3: Traverse the list
    while (curr !== null) {
        if (toRemove.has(curr.val)) {
            // Remove current node: skip it
            prev.next = curr.next;
        } else {
            // Keep it; move prev pointer forward
            prev = curr;
        }
        curr = curr.next;
    }

    // Return head of the modified list
    return dummy.next;
}

// ------------
// Helper functions for IOCE/demo/testing purposes

// Converts an array to a linked list
function arrayToList(arr: number[]): ListNode | null {
    if (arr.length === 0) return null;
    const dummy = new ListNode(0);
    let current = dummy;
    for (let num of arr) {
        current.next = new ListNode(num);
        current = current.next;
    }
    return dummy.next;
}

// Converts a linked list back to an array
function listToArray(head: ListNode | null): number[] {
    const result: number[] = [];
    while (head) {
        result.push(head.val);
        head = head.next;
    }
    return result;
}

// ------------
// IOCE Example Usage:

// Example 1:
let nums1 = [1,2,3], head1 = arrayToList([1,2,3,4,5]);
let res1 = removeNodes(nums1, head1);
console.log(listToArray(res1)); // Output: [4,5]

// Example 2:
let nums2 = [1], head2 = arrayToList([1,2,1,2,1,2]);
let res2 = removeNodes(nums2, head2);
console.log(listToArray(res2)); // Output: [2,2,2]

// Example 3:
let nums3 = [5], head3 = arrayToList([1,2,3,4]);
let res3 = removeNodes(nums3, head3);
console.log(listToArray(res3)); // Output: [1,2,3,4]