const fs = require('fs');
const path = require('path');

function processMarkdownFiles(directory) {
  const items = fs.readdirSync(directory, { withFileTypes: true });

  items.forEach((item) => {
    const fullPath = path.join(directory, item.name);

    if (item.isDirectory()) {
      processMarkdownFiles(fullPath);
    } else if (item.isFile() && path.extname(item.name) === '.md') {
      let content = fs.readFileSync(fullPath, 'utf8');

      // 检查文件是否已经包含 > 或 #，如果有则跳过
      if (content.includes('>') || content.includes('#')) {
        console.log(`跳过文件（已包含 > 或 #）: ${fullPath}`);
        return;
      }

      const lines = content.split('\n');
      const firstLine = lines[0].trim();
      const expectedTitle = path.basename(item.name, '.md');

      // 检查第一行是否为文件名，如果不是则跳过
      if (firstLine !== expectedTitle) {
        console.log(`跳过文件（第一行不是文件名）: ${fullPath}`);
        return;
      }

      // 添加标题并将开头的诗句或引言转换为引用
      content = `# ${expectedTitle}\n\n${content
        .substring(firstLine.length)
        .trim()}`;
      content = content.replace(
        /^# .+\n\n((?:(?!^$)[\s\S])+?)(\n\n|$)/,
        (match, p1, p2) => {
          const lines = p1
            .split('\n')
            .map((line) => `> ${line.trim()}`)
            .join('\n');
          return `${match.split('\n\n')[0]}\n\n${lines}${p2}`;
        }
      );

      fs.writeFileSync(fullPath, content);
      console.log(`已处理文件: ${fullPath}`);
    }
  });
}

const docsDirectory = path.join(__dirname, 'docs');
processMarkdownFiles(docsDirectory);
