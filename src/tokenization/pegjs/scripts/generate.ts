import {generatePegJsFile, initSpw} from './util/generateParser';
import * as fs from 'fs';
import * as path from 'path';


async function run() {
    const lang    = 'spw';
    const parser  = await initSpw();
    const grammar = await generatePegJsFile();

    fs.writeFileSync(path.join(__dirname, '../generated', `spw.pegjs`), grammar);

    const parserFile =
              // language=JavaScript
              `/* eslint-disable */
// @ts-nocheck
// noinspection UnnecessaryLocalVariableJS
const parser = ${parser};
export default parser;
export {parser as ${lang}Parser};
              `;

    const location = path.join(__dirname, '../generated/parser.ts');
    fs.writeFileSync(location, parserFile);

    return import('../generated/parser');
}

export default run();