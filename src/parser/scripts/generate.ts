import * as fs from 'fs';
import * as path from 'path';
import {head} from './util/parser-head.js';
import spwGrammar from '../grammar';
import {generateParser} from '@spwashi/language/parsers/scripts/generateParser';
import {allowedStartRules} from '../grammar/top/top';
import {Parser} from '../../constructs/runtime/runtime';


async function getGeneratedParser(): Promise<Parser> {
    const options   = {allowedStartRules: allowedStartRules};
    const generated = await generateParser(head, spwGrammar, options);
    const varName   = 'generatedParser';

    // string
    const pegjs_path = path.join(__dirname, '../generated', `spw.pegjs`);
    fs.writeFileSync(pegjs_path, generated.grammar);

    // parser
    const parser_ts_path = path.join(__dirname, '../generated/index.ts');
    const parserString   = [
        `// language=JavaScript`,
        `/* eslint-disable */`,
        `// @ts-nocheck`,
        `// noinspection UnnecessaryLocalVariableJS`,
        `const ${varName} = ${(generated.parser)};`,
        `export default ${varName};`,
        `export {${varName} as spwParser};`,
    ]
        .join('\n');
    fs.writeFileSync(parser_ts_path, parserString);

    return import('../generated')
        .then(({spwParser}) => spwParser as unknown as Parser);
}

const generatedParser = getGeneratedParser();
export default generatedParser;