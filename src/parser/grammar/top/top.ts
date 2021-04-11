import {anyOf, sequenceOf, zeroOrMoreOf} from '@spwashi/language/parsers/grammar/combinators';
import dedent from 'dedent';
import {expressions} from '../item/expressions/_list.ref';
import {containerNodes} from '../item/nodes/containers/_list.ref';
import {Rule} from '@spwashi/language/parsers/grammar';
import {atomNodes} from '../item/nodes/atoms/list.ref';
import {spaceNode} from '../_base/space/space.ref';

const pattern =
          sequenceOf([
                         zeroOrMoreOf(
                             anyOf(
                                 [
                                     ...expressions,
                                     ...containerNodes,
                                     ...atomNodes,
                                     spaceNode.withAction('return null'),
                                 ],
                             ),
                         ),
                     ]);
const action  = /* language=JavaScript */ dedent`
    const items = Array.isArray(body)
                  ? body
                      .map(item => item && item.kind ? item : undefined)
                      .filter(item => typeof item !== 'undefined')
                  : body;
    return items.length === 1 ? items [0] : items;
`;

export const topRule = new Rule('Top', pattern.named('body'), action);