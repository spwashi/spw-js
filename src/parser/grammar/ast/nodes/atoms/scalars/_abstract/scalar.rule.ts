import { Rule } from '@spwashi/language/parsers/grammar';
import { anyOf } from '@spwashi/language/parsers/grammar/combinators';
import { ruleName } from './scalar.ref';
import { anchorNode } from '@grammar/ast/nodes/atoms/scalars/anchor/ref';
import { stringNode } from '@grammar/ast/nodes/atoms/scalars/string/ref';
import { phraseNode } from '@grammar/ast/nodes/atoms/scalars/phrase/ref';
import { numberNode } from '@grammar/ast/nodes/atoms/scalars/number/ref';

export const scalarRule = new Rule(
  ruleName,
  anyOf([phraseNode, numberNode, anchorNode, stringNode]),
);
