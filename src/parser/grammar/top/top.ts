import {anyOf, oneOrMoreOf, sequenceOf} from '@spwashi/language/parsers/grammar/combinators';
import dedent from 'dedent';
import {Rule} from '@spwashi/language/parsers/grammar';
import {spaceNode} from '../base/space/space.ref';
import {ruleName} from '@grammar/top/top.ref';
import {nodes} from '@grammar/ast/nodes/_abstract/_list/node.list.ref';
import {getContainerNodeComponentReferences} from '@grammar/ast/nodes/containers/_abstract/_util/container.ref.init';
import {Domain} from '@constructs/ast';
import {ContainerNode} from '@constructs/ast/nodes/impl/containers/abstract/container';
import _ from 'lodash';
import {strandExpression} from '@grammar/ast/expressions/strand/strand.ref';
import {phraseExpression} from '@grammar/ast/expressions/phrase/phrase.ref';
import {perspectiveExpression} from '@grammar/ast/expressions/perspective/perspective.ref';
import {numberNode} from '@grammar/ast/nodes/atoms/scalar/number/number.ref';

const space               = spaceNode.withAction('return null');
const fragments           = _.flatten(
    ([Domain] as typeof ContainerNode[]).map((Comp) => {
        const components = getContainerNodeComponentReferences(Comp.name);
        return components.open;
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