import { BehaviorExpression } from '@constructs/ast/expressions/sequences/behavior/construct';
import { referenceTo } from '@spwashi/language/parsers/grammar/combinators';

export const ruleName = BehaviorExpression.name;
export const behaviorExpression = referenceTo(ruleName);
