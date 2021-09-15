import { referenceTo } from '@spwashi/language/parsers/grammar/combinators';
import { InstanceExpression } from '@constructs/ast/expressions/sequence/instance/construct';

export const ruleName = InstanceExpression.name;

export const instanceExpression = referenceTo(ruleName);
