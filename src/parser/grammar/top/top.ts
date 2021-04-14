import {anyOf, sequenceOf, zeroOrMoreOf} from '@spwashi/language/parsers/grammar/combinators';
import dedent from 'dedent';
import {Rule} from '@spwashi/language/parsers/grammar';
import {spaceNode} from '../_base/space/space.ref';
import {containerNode} from '../nodes/containers/abstract/ref';
import {atomNode} from '../nodes/atoms/abstract/ref';
import {expression} from '../expressions/abstract/ref';

let space     = spaceNode.withAction('return null');
const pattern =
          sequenceOf([
                         zeroOrMoreOf(
                             anyOf([expression, containerNode, atomNode, space]),
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