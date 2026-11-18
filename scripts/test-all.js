// Tests everything: DragSelect, @dragselect/react, @dragselect/angular (+ its example apps in a real browser) and the docs site.
// Keeps going when a step fails, then prints a summary. Exits with 1 if anything failed.
//
//   yarn test:all                 everything
//   yarn test:all react angular   only these steps (names below)
import { spawnSync } from "child_process";

// in this order: later steps use what earlier ones built
const steps = [
  { name: "core", dir: "DragSelect", what: "build + unit and browser tests", cmd: "yarn test" },
  { name: "react", dir: "DragSelect-react", what: "typecheck + tests + build", cmd: "yarn typecheck && yarn test && yarn build" },
  { name: "angular", dir: "DragSelect-angular", what: "typecheck + tests (incl. SSR) + build", cmd: "yarn typecheck && yarn test && yarn build" },
  {
    name: "angular-e2e",
    dir: "DragSelect-angular/example",
    what: "example apps (Angular 22 zoneless, Angular 19 zone.js) in Chromium",
    cmd: "npm run verify",
  },
  { name: "www", dir: "www", what: "docs site typecheck + build (MDX, broken links, llms.txt)", cmd: "yarn build" },
];

const only = process.argv.slice(2);
const unknown = only.filter((name) => !steps.some((step) => step.name === name));
if (unknown.length) {
  console.error(`Unknown step: ${unknown.join(", ")}. Steps: ${steps.map((step) => step.name).join(", ")}`);
  process.exit(1);
}

const results = [];
for (const step of steps.filter((step) => !only.length || only.includes(step.name))) {
  console.info(`\n▶ ${step.name}: ${step.what}\n  (${step.dir}: ${step.cmd})\n`);
  const started = Date.now();
  const { status } = spawnSync(step.cmd, { cwd: step.dir, stdio: "inherit", shell: true });
  results.push({ ...step, ok: status === 0, seconds: Math.round((Date.now() - started) / 1000) });
}

console.info("\nSummary");
for (const { name, ok, seconds, what } of results)
  console.info(`${ok ? "✅" : "❌"} ${name.padEnd(12)} ${String(seconds).padStart(4)}s  ${what}`);

process.exit(results.every((result) => result.ok) ? 0 : 1);
