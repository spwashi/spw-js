import { referenceTo } from '@spwashi/language/parsers/grammar/combinators';
import { NumberNode } from '@constructs/ast/nodes/scalars/number/construct';

export const ruleName = NumberNode.name;
export const numberNode = referenceTo(ruleName);
