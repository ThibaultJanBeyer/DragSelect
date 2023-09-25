import fs from "fs";

const copy = () => {
  if (!fs.existsSync("docs/")) fs.mkdirSync("docs");

  console.info(`Adding www/build output to docs/ folder`);
  fs.cpSync(`www/build`, `docs/`, { recursive: true });

  console.info(`Copy dragselect/dist to docs/ folder`);
  fs.cpSync(`DragSelect/dist`, `docs/`, { recursive: true });
};

copy();
