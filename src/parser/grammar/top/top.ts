import {anyOf, oneOrMoreOf, sequenceOf} from '@spwashi/language/parsers/grammar/combinators';
import dedent from 'dedent';
import {Rule} from '@spwashi/language/parsers/grammar';
import {spaceNode} from '../_base/space/space.ref';
import {ruleName} from '@grammar/top/top.ref';
import {nodes} from '@grammar/nodes/_list.ref';
import {getContainerNodeComponentReferences} from '@grammar/nodes/containers/_util/abstract/container.ref.init';
import {DomainContainer} from '@constructs/ast';
import {ContainerNode} from '@constructs/ast/nodes/impl/containers/abstract/container';
import _ from 'lodash';
import {strandExpression} from '@grammar/expressions/strand/strand_expression.ref';
import {phraseExpression} from '@grammar/expressions/phrase/phrase_expression.ref';
import {perspectiveExpression} from '@grammar/expressions/perspective/perspective_expression.ref';
import {numberNode} from '@grammar/nodes/atoms/pure/number/number.ref';

const space               = spaceNode.withAction('return null');
const fragments           = _.flatten(
    ([DomainContainer] as typeof ContainerNode[]).map((Comp) => {
        const components = getContainerNodeComponentReferences(Comp.name);
        return components.open.ref;
    }));
const topRuleOptions        = [
    numberNode,
    strandExpression,
    perspectiveExpression,
    ...nodes,
    phraseExpression,
    ...fragments,
    space,
];
const pattern             =
          sequenceOf([oneOrMoreOf(anyOf(topRuleOptions))]);
const action              = /* language=JavaScript */ dedent`
    const items = Array.isArray(body)
                  ? body
                      .map(item => item && item.kind ? item : undefined)
                      .filter(item => typeof item !== 'undefined')
                  : body;
    return items.length === 1 ? items [0] : items;
`;
export const topRuleNames = [ruleName]

export const topRule = new Rule(ruleName, pattern.named('body'), action);