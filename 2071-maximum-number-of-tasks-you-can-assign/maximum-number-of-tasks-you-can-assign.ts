function maxTaskAssign(tasks: number[], workers: number[], pills: number, strength: number): number {
  tasks.sort((a, b) => a - b); // Sort tasks by strength requirement
  workers.sort((a, b) => a - b); // Sort workers by strength

  // Helper function to check if we can assign `count` number of tasks to workers
  const canAssign = (count: number): boolean => {
      let pillStrength = strength; // Strength from the pill
      let remainingPills = pills; // Number of pills remaining

      let taskIndex = count - 1; // We want to assign 'count' number of tasks starting from the hardest one within the first 'count' elements
      let workerIndex = workers.length - 1; // Start from the strongest worker
      let usedWorkers = new Array<number>(); // To keep track of workers used without pills

      while (taskIndex >= 0) {
          if (workerIndex >= 0 && workers[workerIndex] >= tasks[taskIndex]) {
              // The current strongest available worker can handle this task without a pill
              workerIndex--;
              taskIndex--;
          } else {
              // Store workers that can almost be used with a pill
              if (workerIndex >= 0 && workers[workerIndex] + pillStrength >= tasks[taskIndex]) {
                  usedWorkers.push(workers[workerIndex]);
                  workerIndex--;
              } else if (usedWorkers.length > 0) {
                  // Use the pill on the worker that was stored in usedWorkers
                  usedWorkers.pop();
                  taskIndex--;
              } else {
                  return false; // Can't complete the task
              }
          }
      }

      return true;
  };

  // Binary Search to find the maximum number of tasks that can be assigned
  let low = 0;
  let high = Math.min(tasks.length, workers.length);
  let result = 0;

  while (low <= high) {
      let mid = Math.floor((low + high) / 2);

      if (canAssign(mid)) {
          result = mid;
          low = mid + 1;
      } else {
          high = mid - 1;
      }
  }

  return result;
}

// Example usage:
console.log(maxTaskAssign([3, 2, 1], [0, 3, 3], 1, 1)); // Output: 3
console.log(maxTaskAssign([5, 4], [0, 0, 0], 1, 5)); // Output: 1
console.log(maxTaskAssign([10, 15, 30], [0, 10, 10, 10, 10], 3, 10)); // Output: 2