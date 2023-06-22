const fs = require("fs");
const path = require("path");
const ejs = require("ejs");


function getAllFilePaths(folderPath) {
  let filePaths = [];

  // 递归遍历文件夹
  function traverseFolder(currentPath) {
    const files = fs.readdirSync(currentPath);

    for (const file of files) {
      const filePath = path.join(currentPath, file);
      const stats = fs.statSync(filePath);

      if (stats.isDirectory()) {
        // 递归遍历子文件夹
        traverseFolder(filePath);
      } else {
        // 添加文件路径到数组中
        filePaths.push(filePath);
      }
    }
  }

  traverseFolder(folderPath);
  console.log('filePaths: ', filePaths);
  return filePaths;
}


const projectFolderPath = "./folder";
const outputFolderPath = "./templates";

const filepaths = getAllFilePaths(projectFolderPath);

for (const filepath of filepaths) {
  const fileContent = fs.readFileSync(filepath, "utf-8");
  const ejsContent = generateEJSContent(fileContent);

  const filename = path.basename(filepath);
  const ejsFilePath = path.join(outputFolderPath, `${filename}.ejs`);

  fs.writeFileSync(ejsFilePath, ejsContent, "utf-8");
}

function generateEJSContent(fileContent) {
  // 将文件内容转换为 EJS 模板字符串
  // todo 实现不同文件类型的转换
  const ejsTemplate = ejs.render(fileContent);
  return ejsTemplate;
}
