import * as combinators from '@spwashi/language/parsers/grammar/combinators';
import { NumberNode } from '@constructs/ast/nodes/atoms/scalars/number/construct';

export const ruleName = NumberNode.name;
export const numberNode = combinators.referenceTo(ruleName);
