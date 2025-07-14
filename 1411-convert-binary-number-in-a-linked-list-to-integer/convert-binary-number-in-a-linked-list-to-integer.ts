// Definition for singly-linked list node.
class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }
}

/*
 * Function to convert binary represented by a linked list to decimal integer.
 * @param head - ListNode, head of singly-linked list representing binary number
 * @return number - Decimal representation of the binary number
 */
function getDecimalValue(head: ListNode | null): number {
    let result = 0
    let curr = head
    
    // Traverse the linked list
    while (curr !== null) {
        // Shift left by 1 (result *= 2) and add current bit
        result = (result << 1) | curr.val
        curr = curr.next
    }
    
    return result
}