import fs from "fs";

const pkg = JSON.parse(
	fs.readFileSync(new URL("./package.json", import.meta.url), "utf8"),
);

const plugin = {
	// preferred location of name and version
	meta: {
		name: pkg.name,
		version: pkg.version,
	},
	configs: {},
	rules: {},
	processors: {},
};

// for ESM
export default plugin;
