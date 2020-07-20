const { program } = require("commander");
const fs = require("fs");
const glob = require("glob");
const { get, set } = require('lodash');

const replace = program
  .arguments("<key> <glob>")
  .option(
    "-t, --text <text>",
    "a replacement string for the provided key's value"
  )
  .action((key, glb, cmd) => {
    if (!cmd.text) {
      console.error("Replacement text (-t) is required.");
      return;
    }

    const files = getFiles(glb);
    const parsedFiles = files.map((file) => parseFile(file));
    
    parsedFiles.forEach(file => {
      const value = get(file.json, key, null);
      if (!value) {
        return;
      }
      
      set(file.json, key, cmd.text);
      fs.writeFileSync(file.path, JSON.stringify(file.json, null, 2));
    })
  });

replace.parse(process.argv);

function getFiles(glb) {
  if (!glb) {
    return null;
  }

  const paths = glob.sync(glb);

  if (!paths.length) {
    return null;
  }

  return paths.map((path) => {
    return {
      path,
      rawData: fs.readFileSync(path, { encoding: "utf-8" }),
    };
  });
}

function parseFile({ path, rawData }) {
  if (!rawData || !path) {
    return null;
  }

  try {
    const json = JSON.parse(rawData);
    return {
      path,
      json,
      rawData,
    };
  } catch(e) {
    console.error(e);
    return null;
  }
}
