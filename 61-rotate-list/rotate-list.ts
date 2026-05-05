/**
 * IOCE
 *
 * I - Inputs:
 *   - head: ListNode | null
 *       Head of a singly linked list.
 *   - k: number
 *       Number of times to rotate the list to the right.
 *
 * O - Output:
 *   - ListNode | null
 *       Head of the rotated linked list.
 *
 * C - Constraints:
 *   - Number of nodes: [0, 500]
 *   - Node.val: [-100, 100]
 *   - 0 <= k <= 2 * 10^9
 *
 * Time Complexity:
 *   - O(n), where n is the number of nodes
 *
 * Space Complexity:
 *   - O(1)
 *
 * E - Edge Cases:
 *   - head is null -> return null
 *   - only one node -> unchanged
 *   - k = 0 -> unchanged
 *   - k is a multiple of list length -> unchanged
 *   - very large k -> use k % length
 */

/**
 * Definition for singly-linked list.
 */
class ListNode {
    val: number;
    next: ListNode | null;

    constructor(val?: number, next?: ListNode | null) {
        this.val = val ?? 0;
        this.next = next ?? null;
    }
}

function rotateRight(head: ListNode | null, k: number): ListNode | null {
    if (head === null || head.next === null || k === 0) {
        return head;
    }

    // Step 1: Find length and tail
    let length = 1;
    let tail = head;

    while (tail.next !== null) {
        tail = tail.next;
        length++;
    }

    // Step 2: Reduce k because rotating by length gives same list
    k = k % length;

    // If no effective rotation remains, return original head
    if (k === 0) {
        return head;
    }

    // Step 3: Make the list circular
    tail.next = head;

    // Step 4: Find new tail
    // New tail is at position length - k - 1 from the start
    let stepsToNewTail = length - k - 1;
    let newTail = head;

    while (stepsToNewTail > 0) {
        newTail = newTail.next as ListNode;
        stepsToNewTail--;
    }

    // Step 5: New head is next of new tail
    const newHead = newTail.next;

    // Step 6: Break the circle
    newTail.next = null;

    return newHead;
}

/* -------------------- Helper functions for testing -------------------- */

// Convert array to linked list
function buildList(arr: number[]): ListNode | null {
    if (arr.length === 0) return null;

    const dummy = new ListNode(0);
    let current = dummy;

    for (const num of arr) {
        current.next = new ListNode(num);
        current = current.next;
    }

    return dummy.next;
}

// Convert linked list to array
function listToArray(head: ListNode | null): number[] {
    const result: number[] = [];
    let current = head;

    while (current !== null) {
        result.push(current.val);
        current = current.next;
    }

    return result;
}
