import { anchorNode } from '@grammar/ast/nodes/atoms/scalars/anchor/ref';
import { numberNode } from '@grammar/ast/nodes/atoms/scalars/number/ref';
import { phraseNode } from '@grammar/ast/nodes/atoms/scalars/phrase/ref';
import { stringNode } from '@grammar/ast/nodes/atoms/scalars/string/ref';
import { Rule } from '@spwashi/language/parsers/grammar';
import { anyOf } from '@spwashi/language/parsers/grammar/combinators';
import { ruleName } from './scalar.ref';

export const scalarRule = new Rule(
  ruleName,
  anyOf([phraseNode, numberNode, anchorNode, stringNode]),
);
