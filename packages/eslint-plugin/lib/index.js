import fs from "fs";
import { noAsyncRule } from "./rules/restrict-await-in-define.js";
import { noDoRule } from "./rules/no-dopromise-outside-define.js";
const pkg = JSON.parse(fs.readFileSync(new URL("./../package.json", import.meta.url), "utf8"));
export const plugin = {
    // preferred location of name and version
    meta: {
        name: pkg.name,
        version: pkg.version,
    },
    configs: {},
    rules: {
        noAsyncRule,
        noDoRule
    },
    processors: {},
};
export default plugin;
