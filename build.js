const fs = require("fs");

const copy = () => {
  if (!fs.existsSync("docs/")) fs.mkdirSync("docs");
  if (!fs.existsSync("dist/")) fs.mkdirSync("dist");

  console.info(`Adding www/build output to docs/ folder`);
  fs.cpSync(`www/build`, `docs/`, { recursive: true });

  console.info(`Copy dragselect/dist to docs/v3 folder`);
  fs.cpSync(`DragSelect/dist`, `docs/`, { recursive: true });
};

copy();
