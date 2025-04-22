import fs from "fs";
import path from "path";

interface Data {
  title: string;
  questionId: string;
  slug: string;
  difficulty: string;
  url: string;
  tags: string[];
  acceptanceRate: number;
  content: string;
  codeSnippets: { lang: string; code: string }[];
}

export async function automateSubmit(solution: string, data: Data): Promise<void> {

  const { slug, questionId, content } = data;

  const folderName = `${questionId}-${slug}`;
  const filePath = path.join(folderName, `${slug}.ts`);

  fs.mkdirSync(folderName, { recursive: true });
  fs.writeFileSync(filePath, solution);
  fs.writeFileSync(path.join(folderName, 'README.md'), content);
}