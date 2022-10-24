/**
 * @param {number[][]} edges
 * @return {number}
 */
var findCenter = function(edges) {
  const tracker = {};
  
  for (let i = 0; i < edges.length; i++) {
    if (!tracker[edges[i][0]]) tracker[edges[i][0]] = 1;
    else tracker[edges[i][0]]++;
    
    if (!tracker[edges[i][1]]) tracker[edges[i][1]] = 1;
    else tracker[edges[i][1]]++;
  }
  
  console.log(tracker)
  for (let node in tracker) {
    if (tracker[node] === edges.length) return node;
  }
};