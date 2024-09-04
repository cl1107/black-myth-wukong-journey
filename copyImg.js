const fs = require('fs').promises;
const path = require('path');

const zhDir = path.join(__dirname, 'docs', 'zh', 'journey');
const enDir = path.join(__dirname, 'docs', 'en', 'journey');
const categories = ['renwu', 'toumu', 'xiaoyao', 'yaowang'];

async function copyImages() {
  for (const category of categories) {
    const zhMetaPath = path.join(zhDir, category, '_meta.json');
    const enMetaPath = path.join(enDir, category, '_meta.json');

    try {
      const zhMeta = JSON.parse(await fs.readFile(zhMetaPath, 'utf-8'));
      const enMeta = JSON.parse(await fs.readFile(enMetaPath, 'utf-8'));

      for (let i = 0; i < zhMeta.length; i++) {
        const zhFileName = `${zhMeta[i]}.md`;
        const enFileName = `${enMeta[i]}.md`;
        const zhFilePath = path.join(zhDir, category, zhFileName);
        const enFilePath = path.join(enDir, category, enFileName);

        const zhContent = await fs.readFile(zhFilePath, 'utf-8');
        let enContent = await fs.readFile(enFilePath, 'utf-8');

        const imageMatch = zhContent.match(/!\[.*?\]\((.*?)\)/);
        if (imageMatch) {
          const imagePath = imageMatch[1];
          enContent += `\n\n![${enMeta[i]}](${imagePath})`;
          await fs.writeFile(enFilePath, enContent);
          console.log(`Added image to ${enFilePath}`);
        }
      }
    } catch (error) {
      console.error(`Error processing ${category}: ${error.message}`);
    }
  }
}

copyImages().then(() => console.log('Image copying completed.'));