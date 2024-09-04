const fs = require('fs').promises;
const path = require('path');

const categories = ['xiaoyao', 'toumu', 'yaowang', 'renwu'];
const languages = ['en', 'zh'];

async function readMetaJson(dirPath) {
  try {
    const metaPath = path.join(dirPath, '_meta.json');
    const metaContent = await fs.readFile(metaPath, 'utf-8');
    return JSON.parse(metaContent);
  } catch (error) {
    console.error(`Error reading _meta.json in ${dirPath}:`, error);
    return [];
  }
}

async function mergeMarkdownFiles(language) {
  let mergedContent = '';

  for (const category of categories) {
    const categoryPath = path.join(__dirname, 'docs', language, 'journey', category);
    const metaOrder = await readMetaJson(categoryPath);

    for (const fileName of metaOrder) {
      const filePath = path.join(categoryPath, `${fileName}.md`);
      try {
        const content = await fs.readFile(filePath, 'utf-8');
        mergedContent += content + '\n\n';
      } catch (error) {
        console.error(`Error reading file ${filePath}:`, error);
      }
    }
  }

  const outputPath = path.join(__dirname, 'docs', language, 'allJourney', 'index.md');
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, mergedContent);
  console.log(`Merged content written to ${outputPath}`);
}

async function main() {
  for (const language of languages) {
    await mergeMarkdownFiles(language);
  }
}

main().catch(console.error);