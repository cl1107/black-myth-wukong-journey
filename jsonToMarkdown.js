const fs = require('fs').promises;
const path = require('path');

async function convertJsonToMarkdown() {
  try {
    // 读取 JSON 文件
    const jsonData = await fs.readFile('output.json', 'utf-8');
    const data = JSON.parse(jsonData);

    // 创建主输出目录
    const mainOutputDir = 'xiaoyao';
    await fs.mkdir(mainOutputDir, { recursive: true });

    // 遍历 JSON 数组
    for (const item of data) {
      const { 一级分类, 姓名, 评诗, 内容, 图片 } = item;

      // 创建一级分类目录
      const categoryDir = path.join(mainOutputDir, 一级分类);
      await fs.mkdir(categoryDir, { recursive: true });

      // 格式化评诗
      const formattedPoem = 评诗
        .split('。')
        .filter((line) => line.trim())
        .map((line) => `> ${line.trim()}。`)
        .join('\n');

      // 生成 Markdown 内容
      const markdownContent = `# ${姓名}\n\n${formattedPoem}\n\n${内容.replace(
        /\n/g,
        '\n\n'
      )}\n\n![${姓名}](${图片})`;

      // 写入 Markdown 文件
      const fileName = `${姓名}.md`;
      const filePath = path.join(categoryDir, fileName);
      await fs.writeFile(filePath, markdownContent, 'utf-8');

      console.log(`已生成文件: ${一级分类}/${fileName}`);
    }

    console.log('所有 Markdown 文件已生成完毕。');
  } catch (error) {
    console.error('发生错误:', error);
  }
}

convertJsonToMarkdown();
