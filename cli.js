#!/usr/bin/env node
const { Command } = require("commander");
const fs = require("fs");
const path = require("path");
const ejs = require("ejs");

const templatesFolder = "./templates";

// 创建新的命令
const program = new Command();

// 定义命令的版本号
program.version("1.0.0");

// 添加一个名为 "init" 的命令
program
  .command("init <projectName>")
  .description("初始化一个新项目")
  .action((projectName) => {
    const templateDir = path.join(__dirname, "templates");
    const targetDir = path.join(process.cwd(), projectName);

    // 创建目标文件夹
    fs.mkdirSync(targetDir);

    // 读取模板文件并渲染
    const templateFiles = fs.readdirSync(templateDir);

    // 遍历模板文件列表
    for (const templateFile of templateFiles) {
      // 构建模板文件的完整路径
      const templatePath = `${templatesFolder}/${templateFile}`;

      // 读取模板文件的内容
      const templateContent = fs.readFileSync(templatePath, "utf-8");

      // 使用模板引擎渲染模板
      const renderedTemplate = ejs.render(templateContent);

      // 将渲染后的模板写入目标文件夹
      const targetFilePath = path.join(targetDir, templateFile.replace(".ejs", ""));
      fs.writeFileSync(targetFilePath, renderedTemplate, "utf-8");
    }

    console.log(`项目 ${projectName} 初始化成功！`);
  });

// 解析命令行参数
program.parse(process.argv);