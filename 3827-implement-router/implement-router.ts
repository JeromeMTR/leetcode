// IOCE
// I: Initialize Router(memoryLimit), and perform addPacket, forwardPacket, getCount as described.
// O: Return the response for each method
// C: O(1) addPacket/forwardPacket, O(logN) getCount, N ≤ 1e5

// Helper: Binary Search helpers for lower/upper bounds
function lowerBound(arr: number[], target: number): number {
    // First index i where arr[i] >= target
    let left = 0, right = arr.length
    while (left < right) {
        let mid = (left + right) >> 1
        if (arr[mid] >= target) right = mid
        else left = mid + 1
    }
    return left
}
function upperBound(arr: number[], target: number): number {
    // First index i where arr[i] > target
    let left = 0, right = arr.length
    while (left < right) {
        let mid = (left + right) >> 1
        if (arr[mid] > target) right = mid
        else left = mid + 1
    }
    return left
}

// The Packet type
type Packet = {
    source: number,
    destination: number,
    timestamp: number
}

class Router {
    private memoryLimit: number                   // Max number of packets
    private queue: Packet[]                       // FIFO queue of packets
    private packetSet: Set<string>                // To check duplicates
    private destinationMap: Map<number, number[]> // destination-> list of timestamps (sorted)

    constructor(memoryLimit: number) {
        this.memoryLimit = memoryLimit
        this.queue = []
        this.packetSet = new Set()
        this.destinationMap = new Map()
    }

    // Return a unique string key for a packet, for duplicate checking
    private packetKey(s: number, d: number, t: number): string {
        // Use non-overlapping delimiters
        return `${s}|${d}|${t}`
    }

    /**
     * Adds a new packet with given source, destination, timestamp.
     * Enforces FIFO eviction to respect memory limit.
     * Returns true if successfully added (not duplicate), false otherwise.
     */
    addPacket(source: number, destination: number, timestamp: number): boolean {
        const key = this.packetKey(source, destination, timestamp)
        if (this.packetSet.has(key)) {
            // Duplicate detected
            return false
        }

        // If at limit, evict the oldest first
        if (this.queue.length >= this.memoryLimit) {
            this.evictOldest()
        }

        // Add to queue
        const packet = { source, destination, timestamp }
        this.queue.push(packet)
        this.packetSet.add(key)
        // Maintain timestamps list for the destination
        if (!this.destinationMap.has(destination)) {
            this.destinationMap.set(destination, [])
        }
        this.destinationMap.get(destination)!.push(timestamp) // Timestamps are naturally sorted by increasing timestamp

        return true
    }

    /**
     * Forwards (removes) the oldest packet from the router.
     * Returns [source, destination, timestamp], or [] if queue is empty.
     */
    forwardPacket(): number[] {
        if (this.queue.length === 0) return []

        const packet = this.queue.shift()!
        const key = this.packetKey(packet.source, packet.destination, packet.timestamp)
        this.packetSet.delete(key)

        // Remove the timestamp from the destination's timestamp list
        const arr = this.destinationMap.get(packet.destination)!
        // Remove from the front, as packets are added & removed FIFO
        if (arr.length && arr[0] === packet.timestamp) {
            arr.shift()
        } else {
            // Sanity fallback, should never happen with strictly increasing timestamps
            const ix = arr.indexOf(packet.timestamp)
            if (ix >= 0) arr.splice(ix, 1)
        }
        // Cleanup map if no more timestamps
        if (arr.length === 0) {
            this.destinationMap.delete(packet.destination)
        }
        return [packet.source, packet.destination, packet.timestamp]
    }

    /**
     * Returns count of non-forwarded packets with a given destination and
     * timestamp in the closed range [startTime, endTime].
     */
    getCount(destination: number, startTime: number, endTime: number): number {
        const arr = this.destinationMap.get(destination)
        if (!arr) return 0
        // Find leftmost timestamp >= startTime
        const left = lowerBound(arr, startTime)
        // Find leftmost timestamp > endTime
        const right = upperBound(arr, endTime)
        return right - left
    }

    // Helper: evict the oldest packet (from front of queue)
    private evictOldest() {
        if (this.queue.length === 0) return
        const packet = this.queue.shift()!
        const key = this.packetKey(packet.source, packet.destination, packet.timestamp)
        this.packetSet.delete(key)

        const arr = this.destinationMap.get(packet.destination)!
        // Remove from front of array as it's in FIFO order
        if (arr.length && arr[0] === packet.timestamp) {
            arr.shift()
        } else {
            // fallback
            const ix = arr.indexOf(packet.timestamp)
            if (ix >= 0) arr.splice(ix, 1)
        }
        if (arr.length === 0) this.destinationMap.delete(packet.destination)
    }
}

/* ----------- Example Usage and IOCE demonstration ----------- */
// let router = new Router(3)
// console.log(router.addPacket(1, 4, 90))   // true
// console.log(router.addPacket(2, 5, 90))   // true
// console.log(router.addPacket(1, 4, 90))   // false (duplicate)
// console.log(router.addPacket(3, 5, 95))   // true
// console.log(router.addPacket(4, 5, 105))  // true (evicts [1,4,90])
// console.log(router.forwardPacket())        // [2,5,90]
// console.log(router.addPacket(5, 2, 110))  // true
// console.log(router.getCount(5, 100, 110)) // 1 (only [4,5,105])