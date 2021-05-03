import {ruleName} from './perspective.ref';
import {Rule} from '@spwashi/language/parsers/grammar';
import {anyOf, optionally, sequenceOf, stringLike, zeroOrMoreOf} from '@spwashi/language/parsers/grammar/combinators';
import {spaceNode} from '../../../base/space/space.ref';
import {PerspectiveExpression} from '@constructs/ast';
import {node} from '@grammar/ast/nodes/_abstract/node.ref';
import {essentialContainer} from '@grammar/ast/nodes/containers/essence/essence.container.ref';
import {perspectiveAtom} from '@grammar/ast/nodes/atoms/operators/operators';

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
                         optionally(stringLike('->')),
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