import * as combinators from '@spwashi/language/parsers/grammar/combinators';
import {PerspectiveExpression} from '@constructs/ast/expressions/operations/perspective/expression';

export const ruleName              = PerspectiveExpression.name;
export const perspectiveExpression = combinators.referenceTo(ruleName)