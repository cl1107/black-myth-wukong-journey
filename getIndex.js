const fs = require('fs');

// 读取output.json文件
fs.readFile('output.json', 'utf8', (err, data) => {
  if (err) {
    console.error('读取文件失败:', err);
    return;
  }

  // 解析JSON数据
  const jsonData = JSON.parse(data);

  // 获取一级分类为小妖的所有姓名字段
  const names = jsonData
    .filter((item) => item['一级分类'] === '人物')
    .map((item) => item['姓名']);

  // 构造要写入的_meta.json内容
  const metaData = JSON.stringify(names, null, 2);

  // 写入_meta.json文件
  fs.writeFile('_meta.json', metaData, 'utf8', (err) => {
    if (err) {
      console.error('写入文件失败:', err);
    } else {
      console.log('_meta.json文件已成功更新');
    }
  });
});
