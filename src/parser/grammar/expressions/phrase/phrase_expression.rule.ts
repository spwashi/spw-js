import {anyOf, oneOrMoreOf, sequenceOf, zeroOrMoreOf} from '@spwashi/language/parsers/grammar/combinators';
import {Rule} from '@spwashi/language/parsers/grammar';
import {spaceTab} from '../../_base/space/whitespace.patterns';
import {ruleName} from './phrase_expression.ref';
import {nodes} from '../../nodes/_list.ref';
import {PhraseExpression} from '@constructs/ast';
import {node} from '@grammar/nodes/abstract/ref';
import {perspectiveExpression} from '@grammar/expressions/perspective/perspective_expression.ref';

const head         = anyOf([
                               perspectiveExpression,
                               node,
                           ]);
const tailSequence = [zeroOrMoreOf(spaceTab), anyOf(nodes).named('tail')];
const tail         = oneOrMoreOf(sequenceOf(tailSequence).withAction(`return tail`));
const pattern      = sequenceOf([head.named('head'), tail.named('tail')]);
const action       = /* language=JavaScript */ `
    var items = [head, ...tail];
    return toSpwItem({
                         kind:  '${PhraseExpression.kind}',
                         items: items
                     })
`;

export const phraseExpressionRule = new Rule(ruleName, pattern, action)