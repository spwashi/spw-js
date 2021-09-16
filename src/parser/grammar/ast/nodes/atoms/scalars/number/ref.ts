import { NumberNode } from '@constructs/ast/nodes/scalars/number/construct';
import { referenceTo } from '@spwashi/language/parsers/grammar/combinators';

export const ruleName = NumberNode.name;
export const numberNode = referenceTo(ruleName);
