#!/usr/bin/env node

const { program } = require("commander");
const fs = require("fs");

program.command("create <name>").action((name) => {
  fs.writeFile(`${name}.json`, "{}", () => {});
});

program.command("replace <key>", "replace the value for a json key for all files");

program.parse(process.argv);
