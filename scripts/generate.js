const {initSpw, generatePegJsFile} = require("../dist/util/generateParser");
const path                         = require('path');
const fs                           = require('fs');

run();

async function run() {
    const lang    = 'spw';
    const parser  = await initSpw();
    const grammar = await generatePegJsFile();

    fs.writeFileSync(path.join(__dirname, '../peg', `spw.pegjs`), grammar);

    const parserFile =
              // language=JavaScript
              `
                  // @ts-nocheck
                  // noinspection UnnecessaryLocalVariableJS
                  const parser = ${parser};
                  export default parser;
                  export {parser as ${lang}Parser};
              `;

    const location = path.join(__dirname, '../src/parser.ts');
    fs.writeFileSync(location, parserFile);
}