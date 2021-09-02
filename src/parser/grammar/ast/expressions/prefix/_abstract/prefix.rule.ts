import { ruleName } from './prefix.ref';
import { Rule } from '@spwashi/language/parsers/grammar';
import { sequenceOf } from '@spwashi/language/parsers/grammar/combinators';
import { PrefixExpression } from '@constructs/ast/expressions/prefix/construct';
import _operands from '@grammar/ast/expressions/prefix/_abstract/_components/operands';
import _operator from '@grammar/ast/expressions/prefix/_abstract/_components/operator';
import _optionalSpaces from '@grammar/ast/expressions/prefix/_abstract/_components/spaces';

const kind = `${PrefixExpression.kind}`;
const name = ruleName;
const pattern = sequenceOf([
  _operator.pattern.named(_operator.name),
  _optionalSpaces.pattern,
  _operands.pattern.named(_operands.name),
]);
// language=JavaScript
const action = `return toConstruct({ kind: '${kind}', ${_operator.name}, ${_operands.name} });`;
export const prefixExpressionRule = new Rule(name, pattern, action);
