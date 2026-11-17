// Prepares @dragselect/react and @dragselect/angular for release.
// Bumps both wrappers to the current `dragselect` version, then typechecks, tests and builds them,
// and runs the Angular example app's browser tests against the built packages.
// Does not commit or publish; run `yarn publish:wrappers` for that.
import fs from "fs";
import { execSync } from "child_process";

const WRAPPERS = ["DragSelect-react", "DragSelect-angular"];

const readJson = (path) => JSON.parse(fs.readFileSync(path, "utf8"));
const writeJson = (path, data) =>
  fs.writeFileSync(path, JSON.stringify(data, null, 2) + "\n");
const run = (cmd, cwd = ".") => {
  console.info(`\n$ ${cwd === "." ? "" : `(${cwd}) `}${cmd}`);
  execSync(cmd, { cwd, stdio: "inherit" });
};

const version = readJson("DragSelect/package.json").version;
console.info(`Releasing wrappers at dragselect@${version}`);

for (const dir of WRAPPERS) {
  const path = `${dir}/package.json`;
  const pkg = readJson(path);
  pkg.version = version;
  pkg.peerDependencies.dragselect = `^${version}`;
  pkg.devDependencies.dragselect = `^${version}`;
  writeJson(path, pkg);
  console.info(`${pkg.name} -> ${version}`);

  const changelog = fs.readFileSync(`${dir}/CHANGELOG.md`, "utf8");
  if (!changelog.includes(version))
    console.warn(`⚠️  ${dir}/CHANGELOG.md has no entry for ${version}`);
}

const www = readJson("www/package.json");
www.dependencies["@dragselect/react"] = version;
writeJson("www/package.json", www);
console.info(`www @dragselect/react -> ${version}`);

run("yarn");

for (const dir of WRAPPERS) {
  run("yarn typecheck", dir);
  run("yarn test", dir);
  run("yarn build", dir);
}

// the Angular example app: installs the built packages like a user would and runs browser tests
run("npm run verify", "DragSelect-angular/example");

console.info(`\nDone. Commit, push, then run: yarn publish:wrappers`);
