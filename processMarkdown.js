const fs = require('fs').promises;
const path = require('path');

async function processMarkdownFiles(directory) {
  const items = await fs.readdir(directory, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(directory, item.name);

    if (item.isDirectory()) {
      await processMarkdownFiles(fullPath);
    } else if (item.isFile() && path.extname(item.name) === '.md') {
      await processMarkdownFile(fullPath);
    }
  }
}

async function processMarkdownFile(filePath) {
  console.log(`处理文件: ${filePath}`);
  const content = await fs.readFile(filePath, 'utf8');
  const lines = content.split('\n');
  let modified = false;
  let inFirstParagraph = false;
  let foundFirstParagraph = false;
  let result = [];

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    if (line.startsWith('# ')) {
      result.push(line);
      inFirstParagraph = true;
    } else if (inFirstParagraph) {
      if (line.trim() !== '') {
        foundFirstParagraph = true;
        if (!line.startsWith('> ')) {
          line = '> ' + line;
          modified = true;
        }
        result.push(line);
      } else if (foundFirstParagraph) {
        inFirstParagraph = false;
        result.push(line);
      } else {
        result.push(line);
      }
    } else {
      result.push(line);
    }
  }

  if (modified) {
    await fs.writeFile(filePath, result.join('\n'), 'utf8');
    console.log(`已修改文件: ${filePath}`);
  } else {
    console.log(`文件未发生变化: ${filePath}`);
  }
}

const journeyDir = path.join(__dirname, 'docs', 'en', 'journey');
processMarkdownFiles(journeyDir).catch(console.error);