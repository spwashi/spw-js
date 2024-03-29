import { generateParser } from '@spwashi/language/parsers/scripts/generateParser';
import * as fs from 'fs';
import * as path from 'path';
import { RawConstruct } from '../../constructs/ast/_abstract/_types/internal';
import spwGrammar, { allowedStartRules } from '../grammar';
import head from './util/parser-head.js';

export type SpwParser = {
  parse: (input: string) => RawConstruct;
  SyntaxError: Error;
};

async function getGeneratedParser(): Promise<SpwParser> {
  const options = { allowedStartRules: allowedStartRules };
  const generated = await generateParser(head, spwGrammar, options);
  const varName = 'generatedParser';

  // string
  const pegjs_path = path.join(__dirname, '../generated', `spw.pegjs`);
  fs.writeFileSync(pegjs_path, generated.grammar);

  // parser
  const parser_ts_path = path.join(__dirname, '../generated/index.ts');
  const parserString = [
    `// language=JavaScript`,
    `/* eslint-disable */`,
    `// @ts-nocheck`,
    `// noinspection UnnecessaryLocalVariableJS`,
    `const ${varName} = ${generated.parser};`,
    `export default ${varName};`,
    `export {${varName} as spwParser};`,
    '',
  ].join('\n');
  fs.writeFileSync(parser_ts_path, parserString);

  return import('../generated').then(({ spwParser }) => spwParser as unknown as SpwParser);
}

const generatedParser = getGeneratedParser();
export default generatedParser;
