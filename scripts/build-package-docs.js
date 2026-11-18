// Turns the docs site (www/docs) into plain Markdown in DragSelect/docs, which ships with the npm package.
// So coding agents (and people) find the docs of the installed version in node_modules/dragselect/docs.
// Runs as part of `yarn build` in DragSelect/.
import fs from "fs";
import path from "path";

const root = path.join(import.meta.dirname, "..");
const docsDir = path.join(root, "www/docs");
const outDir = path.join(root, "DragSelect/docs");
const site = "https://dragselect.com";
const skip = ["info.mdx"]; // about the project, not about using it

const { version } = JSON.parse(fs.readFileSync(path.join(root, "DragSelect/package.json"), "utf8"));

// all pages, in the order of the docs sidebar
const position = (file) => {
  const match = fs.readFileSync(file, "utf8").match(/^sidebar_position:\s*([\d.]+)/m);
  return match ? Number(match[1]) : 99;
};
const folderPosition = (dir) => {
  const file = path.join(dir, "_category_.json");
  return fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, "utf8")).position ?? 99 : 99;
};
const collect = (dir) =>
  fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() || (entry.name.endsWith(".mdx") && !skip.includes(entry.name)))
    .map((entry) => {
      const full = path.join(dir, entry.name);
      return entry.isDirectory()
        ? { position: folderPosition(full), files: collect(full) }
        : { position: position(full), files: [full] };
    })
    .sort((a, b) => a.position - b.position)
    .flatMap((entry) => entry.files);

const pages = collect(docsDir).map((file) => {
  const rel = path.relative(docsDir, file).replace(/\.mdx$/, "");
  const source = fs.readFileSync(file, "utf8");
  const frontMatter = source.match(/^---\n([\s\S]*?)\n---\n/)?.[1] ?? "";
  const description = (frontMatter.match(/^description:\s*(.*)$/m)?.[1] ?? "").replace(/^"(.*)"$/, "$1");
  const title = source.replace(/^---\n[\s\S]*?\n---\n/, "").match(/^# (.*)$/m)?.[1] ?? rel;
  return { file, rel, source, description, title };
});
const known = new Set(pages.map((page) => page.rel));

// "/docs/API/Settings#x", "../API/Settings" or "Settings" → a relative .md link if we have that page, else the site
const fixLink = (target, from) => {
  if (/^(https?:|mailto:|#)/.test(target)) return target;
  const [pathPart, hash = ""] = target.split("#");
  const anchor = hash ? `#${hash}` : "";
  const docPath = pathPart.startsWith("/docs/")
    ? pathPart.slice("/docs/".length)
    : pathPart.startsWith("/")
      ? null
      : path.posix.join(path.posix.dirname(from), pathPart);
  const page = docPath?.replace(/\.mdx?$/, "");
  if (page && known.has(page)) return path.posix.relative(path.posix.dirname(from), page) + ".md" + anchor;
  return site + (docPath ? `/docs/${docPath}` : pathPart) + anchor;
};

const toMarkdown = ({ source, rel }) => {
  const lines = source.replace(/^---\n[\s\S]*?\n---\n/, "").split("\n");
  const out = [];
  let fence = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (/^\s*```/.test(line)) fence = !fence;
    if (fence || /^\s*```/.test(line)) {
      out.push(line);
      continue;
    }
    if (/^import .* from /.test(line)) continue;
    // tabs become bold labels
    const tab = line.match(/^\s*<TabItem .*label="([^"]+)"/);
    if (tab) {
      out.push(`**${tab[1]}**`, "");
      continue;
    }
    if (/^\s*<\/?(Tabs|TabItem)>\s*$/.test(line)) continue;
    // other HTML/JSX blocks (CodePen embeds, buttons…) are site decoration; the docs link to CodePen below each embed
    const block = line.match(/^<([A-Za-z]+)/);
    if (block) {
      let end = i;
      while (end < lines.length && !lines[end].includes(`</${block[1]}>`) && !/\/>\s*$/.test(lines[end])) end++;
      i = end;
      continue;
    }
    out.push(
      line
        // MDX escapes, which plain Markdown doesn't need
        .replace(/\\([{}])/g, "$1")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/(!?)\[([^\]]*)\]\(([^)\s]+)\)/g, (_, bang, text, target) =>
        bang && target.startsWith("/") ? `![${text}](${site}${target})` : `${bang}[${text}](${fixLink(target, rel)})`,
      ),
    );
  }
  return out.join("\n").replace(/\n{3,}/g, "\n\n").trim() + "\n";
};

fs.rmSync(outDir, { recursive: true, force: true });
for (const page of pages) {
  const file = path.join(outDir, page.rel + ".md");
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, toMarkdown(page));
}

const index = [
  `# DragSelect ${version} docs`,
  "",
  `The docs of the installed DragSelect version, as Markdown. Online: ${site}/docs/intro`,
  "",
  "React and Angular: see the README of `@dragselect/react` or `@dragselect/angular` (also in guided-examples below).",
  "",
  ...pages.map((page) => `- [${page.title}](${page.rel}.md)${page.description ? `: ${page.description}` : ""}`),
  "",
].join("\n");
fs.writeFileSync(path.join(outDir, "README.md"), index);

console.log(`Wrote ${pages.length} pages to DragSelect/docs`);

// The READMEs (npm and GitHub) end with a list of all docs pages, linked to the site.
const sections = { "": "Getting started", "guided-examples": "Guides", API: "API" };
const start = "<!-- docs:start (generated from www/docs by scripts/build-package-docs.js, don't edit) -->";
const end = "<!-- docs:end -->";
const docsList = [
  start,
  "",
  "# Docs",
  "",
  ...Object.entries(sections).flatMap(([dir, label]) => [
    `**${label}**`,
    "",
    ...pages
      .filter((page) => path.posix.dirname(page.rel).replace(/^\.$/, "") === dir)
      .map((page) => `- [${page.title}](${site}/docs/${page.rel})${page.description ? `: ${page.description}` : ""}`),
    "",
  ]),
  end,
].join("\n");

for (const readme of ["DragSelect/README.md", "README.md"]) {
  const file = path.join(root, readme);
  const text = fs.readFileSync(file, "utf8");
  const next = text.includes(start)
    ? text.replace(new RegExp(`${start.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[\\s\\S]*?${end}`), docsList)
    : text.trimEnd() + "\n\n" + docsList + "\n";
  if (next !== text) {
    fs.writeFileSync(file, next);
    console.log(`Updated the docs list in ${readme}`);
  }
}
