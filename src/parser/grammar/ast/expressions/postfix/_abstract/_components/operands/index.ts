import { infixExpression } from '@grammar/ast/expressions/infix/_abstract/infix.ref';
import { prefixExpression } from '@grammar/ast/expressions/prefix/_abstract/prefix.ref';
import { node } from '@grammar/ast/nodes/_abstract/node.ref';
import { nodeDelimiter } from '@grammar/ast/nodes/atoms/operators/delimiters/operator/ref';
import { spaceNode } from '@grammar/utility/space/space.ref';
import { anyOf, sequenceOf, zeroOrMoreOf } from '@spwashi/language/parsers/grammar/combinators';

const _operand = anyOf([prefixExpression, infixExpression, node]);

// language=JavaScript
export default {
  name: 'operands',
  pattern: anyOf([
    zeroOrMoreOf(
      sequenceOf([_operand.named('operand'), nodeDelimiter, zeroOrMoreOf(spaceNode)]).withAction(
        `return operand;`,
      ),
    ),
    _operand,
  ]),
};
