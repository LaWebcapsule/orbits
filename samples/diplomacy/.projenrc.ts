import { javascript, typescript } from "projen";
const project = new typescript.TypeScriptProject({
  defaultReleaseBranch: "main",
  name: "diplomacy",
  packageManager: javascript.NodePackageManager.PNPM,
  projenrcTs: true,

  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
});

project.addDeps('@wbce/eslint-plugin-orbits@workspace:')
project.addDeps('@wbce/orbits-core@workspace:');

project.eslint?.addPlugins("@wbce/eslint-plugin-orbits")

project.tsconfig?.addInclude("eslint.config.mjs")

project.synth();