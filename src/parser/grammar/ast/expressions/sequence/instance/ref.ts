import { InstanceExpression } from '@constructs/ast/expressions/sequence/instance/construct';
import { referenceTo } from '@spwashi/language/parsers/grammar/combinators';

export const ruleName = InstanceExpression.name;

export const instanceExpression = referenceTo(ruleName);
