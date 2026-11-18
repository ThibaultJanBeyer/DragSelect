// Builds the React and Angular guides of the docs site from the wrappers' READMEs,
// so there is only one text to keep up to date: the README.
// Runs before `yarn start` and `yarn build` in www/.
import fs from "fs";
import path from "path";

const root = path.join(import.meta.dirname, "..");

const guides = [
  {
    readme: "DragSelect-react/README.md",
    out: "www/docs/guided-examples/React.mdx",
    title: "React",
    position: 8,
    description: "The official React hooks: @dragselect/react.",
    intro: "DragSelect has official React bindings: [`@dragselect/react`](https://www.npmjs.com/package/@dragselect/react).",
  },
  {
    readme: "DragSelect-angular/README.md",
    out: "www/docs/guided-examples/Angular.mdx",
    title: "Angular",
    position: 9,
    description: "The official Angular directives: @dragselect/angular.",
    intro: "DragSelect has official Angular bindings: [`@dragselect/angular`](https://www.npmjs.com/package/@dragselect/angular).",
  },
];

for (const guide of guides) {
  let text = fs.readFileSync(path.join(root, guide.readme), "utf8");

  text = text
    // the license is on the site already
    .replace(/\n## License\n[\s\S]*$/, "\n")
    // "# @dragselect/react" becomes "# React"
    .replace(/^# .*\n/, `# ${guide.title}\n`)
    .replace(/^\[DragSelect\]\(https:\/\/DragSelect\.com\) for \w+\./m, guide.intro)
    // the README groups the steps under "How it works", the site doesn't need that level
    .replace(/^## How it works\n\n/m, "")
    .replace(/^### /gm, "## ")
    // links to the site become site links
    .replace(/\]\(https:\/\/dragselect\.com\/docs\//gi, "](/docs/");

  const frontMatter = [
    "---",
    `# Generated from ${guide.readme} by scripts/sync-wrapper-guides.js. Edit the README instead.`,
    `sidebar_position: ${guide.position}`,
    `description: ${JSON.stringify(guide.description)}`,
    `custom_edit_url: https://github.com/ThibaultJanBeyer/DragSelect/edit/main/${guide.readme}`,
    "---",
    "",
  ].join("\n");

  const file = path.join(root, guide.out);
  const next = frontMatter + "\n" + text;
  if (!fs.existsSync(file) || fs.readFileSync(file, "utf8") !== next) {
    fs.writeFileSync(file, next);
    console.log(`Updated ${guide.out} from ${guide.readme}`);
  }
}
