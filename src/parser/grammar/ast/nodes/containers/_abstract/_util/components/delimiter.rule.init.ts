import { scalars } from '@grammar/ast/nodes/atoms/scalars/_abstract/_list/refs';
import { identifierNode } from '@grammar/ast/nodes/atoms/scalars/identifier/ref';
import { phraseNode } from '@grammar/ast/nodes/atoms/scalars/phrase/ref';
import { containerNodes } from '@grammar/ast/nodes/containers/_abstract/_list/refs';
import { spaceNode } from '@grammar/utility/space/space.ref';
import { Rule } from '@spwashi/language/parsers/grammar';
import {
  anyOf,
  optionally,
  SequenceCombinator,
  sequenceOf,
  stringLike,
} from '@spwashi/language/parsers/grammar/combinators';
import { getContainerNodeComponentReferences } from '../container.ref.init';

function opener(delimiter: IDelimiter): SequenceCombinator {
  const token = stringLike(delimiter.token);

  const underscore = stringLike('_');

  const headIdentifier = anyOf([...scalars.filter((n) => n !== phraseNode), ...containerNodes]);

  const headDescription = optionally(sequenceOf([anyOf(containerNodes)]));

  const describedIdentifier = sequenceOf([
    headIdentifier.named('identifier'),
    headDescription.named('description'),
  ]);

  // language=JavaScript
  const _describedIdentifierAction = 'return {identifier, description}';

  const node = sequenceOf([describedIdentifier.withAction(_describedIdentifierAction)]);

  const combinator = sequenceOf([
    token.named('token'),
    underscore,
    node.named('node'),
    spaceNode.withAction('return null'),
  ]);
  // language=JavaScript
  const action = `
    return toConstruct(
      {
        token: token,
        label: node.identifier,
        kind: '${delimiter.kind}'
      }
    )
  `;
  return combinator.withAction(action);
}
function closer(delimiter: IDelimiter): SequenceCombinator {
  const token = stringLike(delimiter.token);

  const underscore = stringLike('_');

  const node = anyOf([identifierNode]);

  const pattern1 = sequenceOf([token.named('token'), underscore, node.named('node')]);

  const pattern2 = sequenceOf([node.named('node'), underscore, token.named('token')]);

  const _patternAction =
    // language=JavaScript
    `
            return toConstruct({
                                 token: token,
                                 position: 'close',
                                 label: node,
                                 kind: '${delimiter.kind}'
                               })
          `;
  return anyOf([pattern1.withAction(_patternAction), pattern2.withAction(_patternAction)]);
}
export type IDelimiter = { token: string; kind: string };

function plain(delimiter: IDelimiter, index: 'open' | 'close') {
  return (
    sequenceOf([stringLike(delimiter.token).named('tok')])
      // language=JavaScript
      .withAction(
        `return toConstruct({
                              token: tok,
                              position: '${index}',
                              kind: '${delimiter.kind}'
                            })`,
      )
  );
}
export function createDelimiterRule(
  ruleName: string,
  delimiter: IDelimiter,
  index: 'open' | 'close' = 'open',
): Rule {
  const reverse = index !== 'open';
  const { ruleName: name } = getContainerNodeComponentReferences(ruleName)[index];
  const plainDelimiterCombinator = plain(delimiter, index);
  const labeledDelimiterCombinator = !reverse ? opener(delimiter) : closer(delimiter);
  return new Rule(name, anyOf([labeledDelimiterCombinator, plainDelimiterCombinator]));
}
