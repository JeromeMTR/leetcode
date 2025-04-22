// index.ts
// CLI runner for the project
import fetchProblem from "./fetchProblem";
import solveWithOpenAI from "./solveWithOpenAI";
import { automateSubmit } from "./automateSubmit";

async function main() {
  const data = await fetchProblem();
  const solution = await solveWithOpenAI(data!.content);
  await automateSubmit(solution, data!);
}

main().catch((err) => console.error(err));
