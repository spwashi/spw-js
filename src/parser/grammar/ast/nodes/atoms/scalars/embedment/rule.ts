import { EmbedmentNode } from '@constructs/ast';
import { spaceNode } from '@grammar/utility/space/space.ref';
import { Rule } from '@spwashi/language/parsers/grammar';
import {
  anyOf,
  regExpLike,
  sequenceOf,
  zeroOrMoreOf,
} from '@spwashi/language/parsers/grammar/combinators';
import { unicode_noQuotes } from '../../../../../utility/unicode/unicode.ref';
import { ruleName } from './ref';

const backtick = regExpLike('`');
const doubleQuote = regExpLike(`\\"`);
const singleQuote = regExpLike(`\\'`);
const newline = regExpLike('\\n');

const embedmentBody = zeroOrMoreOf(
  anyOf([unicode_noQuotes, spaceNode, doubleQuote, singleQuote, newline]),
);

const _embedmentAction =
  // language=JavaScript
  ` return body.join(""); `;

const pattern = sequenceOf([
  sequenceOf([backtick, embedmentBody.named('body'), backtick]).withAction(_embedmentAction),
]).named('embedment');
// language=JavaScript
const action = `return toConstruct({
                                      kind: '${EmbedmentNode.kind}',
                                      ${EmbedmentNode.components.open.name}: '\`',
                                      ${EmbedmentNode.components.body.name}: embedment,
                                      ${EmbedmentNode.components.close.name}: '\`',
                                    });`;

export const embedmentNodeRule = new Rule(ruleName, pattern, action);
