#!/usr/bin/env node
// filepath: /Users/jeromerodriguez/GitHub/leetcode/dist/automateSubmit.js
import fs from "fs";
import path from "path";
import { exec } from "child_process";

function automateSubmit(solution, data) {
    const { slug, questionId, content } = data;
    const folderName = `${questionId}-${slug}`;
    const filePath = path.join(folderName, `${slug}.ts`);
    fs.mkdirSync(folderName, { recursive: true });
    fs.writeFileSync(filePath, solution);
    fs.writeFileSync(path.join(folderName, 'README.md'), content);

    // Automatically open the folder in VS Code (Mac/Linux/Windows)
    exec(`code "${folderName}"`);
}

// CLI interface when run directly
if (process.argv[1] === new URL(import.meta.url).pathname) {
    const args = process.argv.slice(2);

    if (args.length < 4) {
        console.log('Usage: ./automateSubmit.js <solution> <slug> <questionId> <content>');
        process.exit(1);
    }

    const [solution, slug, questionId, content] = args;
    const data = { slug, questionId, content };

    automateSubmit(solution, data);
}

export { automateSubmit };