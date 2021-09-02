import { ruleName } from './postfix.ref';
import { Rule } from '@spwashi/language/parsers/grammar';
import { sequenceOf } from '@spwashi/language/parsers/grammar/combinators';
import { PostfixExpression } from '@constructs/ast/expressions/postfix/construct';
import _operands from '@grammar/ast/expressions/postfix/_abstract/_components/operands';
import _operator from '@grammar/ast/expressions/postfix/_abstract/_components/operator';
import _spaces from '@grammar/ast/expressions/postfix/_abstract/_components/spaces/_spaces';

const kind = `${PostfixExpression.kind}`;
const name = ruleName;

const __ = _spaces.pattern;
const operands = _operands.pattern.named(_operands.name);
const operators = _operator.pattern.named(_operator.name);
const pattern = sequenceOf([operands, __, operators]);

// language=JavaScript
const action = `
  const expression = {
    kind: '${kind}',
    ${_operator.name},
    ${_operands.name}
  };
  return toConstruct(expression);
`;
export const postfixExpressionRule = new Rule(name, pattern, action);
