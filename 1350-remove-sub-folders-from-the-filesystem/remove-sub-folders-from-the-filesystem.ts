/**
 * Removes all subfolders from a folder list
 * 
 * @param folder - array of folder paths
 * @returns array of folder paths with subfolders removed
 */
function removeSubfolders(folder: string[]): string[] {
    // Sort folders lexicographically so that parent comes before children
    folder.sort();

    const result: string[] = [];

    // Traverse folders and skip subfolders (those starting with previous result + '/')
    for (const dir of folder) {
        // If result is empty or this folder is NOT a subfolder of last result, add it
        // We check if dir starts with (lastResult + '/')
        if (
            result.length === 0 ||
            !dir.startsWith(result[result.length - 1] + '/')
        ) {
            result.push(dir);
        }
        // If it's a subfolder, do nothing (skip)
    }

    return result;
}

// --- Example Usages ---

// Example 1
const input1 = ["/a","/a/b","/c/d","/c/d/e","/c/f"];
console.log(removeSubfolders(input1)); // Output: ['/a', '/c/d', '/c/f']

// Example 2
const input2 = ["/a","/a/b/c","/a/b/d"];
console.log(removeSubfolders(input2)); // Output: ['/a']

// Example 3
const input3 = ["/a/b/c","/a/b/ca","/a/b/d"];
console.log(removeSubfolders(input3)); // Output: ['/a/b/c', '/a/b/ca', '/a/b/d']