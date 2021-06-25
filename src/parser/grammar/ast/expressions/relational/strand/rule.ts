import { ruleName, strandExpression } from './ref';
import { Rule } from '@spwashi/language/parsers/grammar';
import {
  anyOf,
  oneOrMoreOf,
  sequenceOf,
  zeroOrMoreOf,
} from '@spwashi/language/parsers/grammar/combinators';
import { spaceNode } from '../../../../utility/space/space.ref';
import { StrandExpression } from '@constructs/ast';
import { node } from '@grammar/ast/nodes/_abstract/node.ref';
import { transformationOperator } from '@grammar/ast/nodes/atoms/operator/transformation/ref';
import { phraseExpression } from '@grammar/ast/expressions/relational/phrase/ref';
import { perspectiveExpression } from '@grammar/ast/expressions/operational/perspective/ref';
import { StrandTail } from '@constructs/ast/expressions/relational/strand/components/tail';

const reflexive = strandExpression;

const operator = transformationOperator;

const allowedHeadElements = [phraseExpression, perspectiveExpression, node];

const allowedTailElements = [node, reflexive];

const headItem = anyOf(allowedHeadElements);

const tailItem = anyOf(allowedTailElements);

const _tailAction =
  // language=JavaScript
  `
              return toConstruct({
                                   kind: '${StrandTail.kind}',

                                   ${StrandTail.components.operator.name}: operator,
                                   ${StrandTail.components.item.name}:     item,
                               });
          `;

const spaces = zeroOrMoreOf(spaceNode);

const tail = sequenceOf([
  spaces,
  operator.named('operator'),
  spaces,
  tailItem.named('item'),
]).withAction(_tailAction);

const tails = oneOrMoreOf(tail);

const pattern = sequenceOf([headItem.named('head'), spaces, tails.named('tails')]);

const _action =
  // language=JavaScript
  `
              return toConstruct({
                                   kind: '${StrandExpression.kind}',
                                   head,
                                   tails,
                               })
          `;

export const strandRule = new Rule(ruleName, pattern, _action);
