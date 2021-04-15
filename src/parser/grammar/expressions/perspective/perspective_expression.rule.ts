import {ruleName} from './perspective_expression.ref';
import {Rule} from '@spwashi/language/parsers/grammar';
import {anyOf, sequenceOf, zeroOrMoreOf} from '@spwashi/language/parsers/grammar/combinators';
import {spaceNode} from '../../_base/space/space.ref';
import {PerspectiveExpression} from '@constructs/ast';
import {node} from '@grammar/nodes/abstract/ref';
import {perspectiveAtom} from '@grammar/nodes/atoms/labeled/perspective/perspective.ref';
import {essentialContainer} from '@grammar/nodes/containers/essence/ref';

const lensWithSpec =
          sequenceOf([
                         perspectiveAtom.named('atom'),
                         anyOf([essentialContainer]).named('spec'),
                     ])
              .withAction(
                  /* language=JavaScript */ `return {
                      atom,
                      spec,
                  }`,
              );
const lens         =
          sequenceOf([
                         perspectiveAtom.named('atom'),
                     ])
              .withAction(
                  /* language=JavaScript */ `return {
                      atom,
                  }`);
const pattern      =
          sequenceOf([
                         node.named('source'),
                         zeroOrMoreOf(spaceNode),
                         anyOf([
                                   lensWithSpec,
                                   lens,
                               ]).named('lens'),
                         zeroOrMoreOf(spaceNode),
                         node.named('target'),
                     ])
const action       = /* language=JavaScript */ `
    return toSpwItem({
                         kind:   '${PerspectiveExpression.kind}',
                         source,
                         lens:   lens,
                         target: target
                     })`;

export const perspectiveExpressionRule = new Rule(ruleName, pattern, action)