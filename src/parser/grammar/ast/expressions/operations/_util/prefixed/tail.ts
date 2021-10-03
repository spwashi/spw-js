import { expressions } from '@grammar/ast/expressions/_abstract/_list/refs';
import { postfixedExpressions } from '@grammar/ast/expressions/postfixed/_abstract/_list/refs';
import { sequenceExpressions } from '@grammar/ast/expressions/sequences/_abstract/_list/refs';
import { node } from '@grammar/ast/nodes/_abstract/node.ref';

export const stdPrefixExpNodes = [
  ...expressions.filter((i) => ![...sequenceExpressions, ...postfixedExpressions].includes(i)),
  node,
];
