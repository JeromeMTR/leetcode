// Tree node definition
class Node {
    name: string;
    children: Map<string, Node>;
    // Mark for deletion
    deleted: boolean;

    constructor(name: string) {
        this.name = name;
        this.children = new Map();
        this.deleted = false;
    }
}

/**
 * Main function to remove duplicate folders in the file system.
 * @param {string[][]} paths - Array of folder paths.
 * @returns {string[][]} - Remaining folder paths after deletion.
 */
function deleteDuplicateFolder(paths: string[][]): string[][] {
    // === 1. Build the directory tree ===
    const root = new Node(""); // virtual root

    for (const path of paths) {
        let curr = root;
        for (const folder of path) {
            if (!curr.children.has(folder)) {
                curr.children.set(folder, new Node(folder));
            }
            curr = curr.children.get(folder)!;
        }
    }

    // === 2. Serialize each subtree (post-order), and group nodes with the same serialization ===
    // Map from serialization => all nodes with this structure
    const serialMap = new Map<string, Node[]>();

    /**
     * Serialize subtrees: For each node, return a string representing its (name, children serializations).
     * For uniqueness, children must be sorted.
     * Mark the mapping from serialization to node.
     */
    function serialize(node: Node): string {
        if (node.children.size === 0) return ""; // leaf, no serialization

        // Serialize children
        const childSerials: string[] = [];
        for (const child of Array.from(node.children.values()).sort((a, b) => a.name.localeCompare(b.name))) {
            // Use folder name + its sub-serial!
            const serial = child.name + "(" + serialize(child) + ")";
            childSerials.push(serial);
        }
        const res = childSerials.join(""); // No extra delimiters needed
        // Only non-leaf folders have serialization

        // Map serialization to nodes (don't include leaves)
        if (!serialMap.has(res)) serialMap.set(res, []);
        serialMap.get(res)!.push(node);

        return res;
    }

    // Start serialization from children of root (skip the virtual root)
    for (const node of root.children.values()) {
        serialize(node);
    }

    // === 3. Mark all subtrees with duplicate serialization for deletion ===
    function markDeleted(node: Node) {
        node.deleted = true;
        for (const child of node.children.values()) {
            markDeleted(child); // recursively mark all descendants
        }
    }

    for (const [serial, nodes] of serialMap.entries()) {
        // Only mark if there are at least two nodes sharing the structure
        if (nodes.length > 1) {
            for (const node of nodes) {
                markDeleted(node);
            }
        }
    }

    // === 4. Gather paths from root to each (non-deleted) node (pre-order traversal) ===
    const result: string[][] = [];

    function collect(node: Node, path: string[]) {
        if (node !== root && !node.deleted) {
            // For all non-root, non-deleted nodes, record current path
            result.push([...path, node.name]);
        }
        for (const child of node.children.values()) {
            if (!node.deleted) { // only collect from non-deleted parent
                collect(child, node === root ? [] : [...path, node.name]);
            }
        }
    }

    collect(root, []);
    return result;
}

/* =======================
      Example Usage
   ======================= */

// Example 1:
let paths1 = [["a"],["c"],["d"],["a","b"],["c","b"],["d","a"]];
console.log(deleteDuplicateFolder(paths1));
// Output: [["d"],["d","a"]]

// Example 2:
let paths2 = [["a"],["c"],["a","b"],["c","b"],["a","b","x"],["a","b","x","y"],["w"],["w","y"]];
console.log(deleteDuplicateFolder(paths2));
// Output: [["c"],["c","b"],["a"],["a","b"]]

// Example 3:
let paths3 = [["a","b"],["c","d"],["c"],["a"]];
console.log(deleteDuplicateFolder(paths3));
// Output: [["c"],["c","d"],["a"],["a","b"]]