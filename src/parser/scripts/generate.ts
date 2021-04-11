import * as fs from 'fs';
import * as path from 'path';
import {Parser} from '@constructs/runtime/runtime';
import {head} from './util/parser-head.js';
import spwGrammar from '../grammar';
import {generateParser} from '@spwashi/language/parsers/scripts/generateParser';


async function getGeneratedParser(): Promise<Parser> {
    const {grammar, parser: parserContentString} = await generateParser(head, spwGrammar);
    const varName                                = 'generatedParser';
    fs.writeFileSync(
        path.join(__dirname, '../generated', `spw.pegjs`),
        grammar,
    );
    fs.writeFileSync(
        path.join(__dirname, '../generated/index.ts'),
        [
            `// language=JavaScript`,
            `/* eslint-disable */`,
            `// @ts-nocheck`,
            `// noinspection UnnecessaryLocalVariableJS`,
            `const ${varName} = ${parserContentString};`,
            `export default ${varName};`,
            `export {${varName} as spwParser};`,
        ]
            .join('\n'),
    );

    return import('../generated')
        .then(({spwParser}) => spwParser as unknown as Parser);
}

const generatedParser = getGeneratedParser();
export default generatedParser;