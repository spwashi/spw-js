import { anyOf, oneOrMoreOf, sequenceOf } from '@spwashi/language/parsers/grammar/combinators';
import { Rule } from '@spwashi/language/parsers/grammar';
import { spaceNode } from '../utility/space/space.ref';
import { ruleName } from '@grammar/top/top.ref';
import { nodes } from '@grammar/ast/nodes/_abstract/_list/node.list.ref';
import { getContainerNodeComponentReferences } from '@grammar/ast/nodes/containers/_abstract/_util/container.ref.init';
import { Domain } from '@constructs/ast';
import { ContainerNode } from '@constructs/ast/nodes/containers/_abstract/container';
import _ from 'lodash';
import { expressions } from '@grammar/ast/expressions/_abstract/_list/expressions.list.ref';

const space = spaceNode.withAction('return null');

const fragments = _.flatten(
  ([Domain] as typeof ContainerNode[]).map((Comp) => {
    const components = getContainerNodeComponentReferences(Comp.name);
    return components.open;
  }),
);

const topRuleOptions = [...expressions, ...nodes, ...fragments, space];

const pattern = sequenceOf([oneOrMoreOf(anyOf(topRuleOptions))]);

const action =
  // language=JavaScript
  `
              const items = Array.isArray(body)
                            ? body
                                .map(item => item && item.kind ? item : undefined)
                                .filter(item => typeof item !== 'undefined')
                            : body;
              return items.length === 1 ? items [0] : items;
          `;

export const allowedStartRules = [ruleName];

export const topRule = new Rule(ruleName, pattern.named('body'), action);
