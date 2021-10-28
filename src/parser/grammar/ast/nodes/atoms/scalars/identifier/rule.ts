import { IdentifierNode } from '@constructs/ast';
import { Rule } from '@spwashi/language/parsers/grammar';
import {
  anyOf,
  oneOrMoreOf,
  regExpLike,
  sequenceOf,
  stringLike,
  zeroOrMoreOf,
} from '@spwashi/language/parsers/grammar/combinators';
import { ruleName } from './ref';

const identifierPattern2 = sequenceOf([
  oneOrMoreOf(regExpLike('a-zA-Z')).named('head'),
  zeroOrMoreOf(regExpLike('a-zA-Z\\d')).named('tail'),
])
  // language=JavaScript
  .withAction(
    `
      const characters = [
        ...head,
        ...tail
      ];
      return characters.join("");
    `,
  );

// language=JavaScript
const _identifierPattern1Action = `
  return [
    // ...head, 
    ...tail
  ].join("");
`;
const identifierPattern1 = sequenceOf([
  // oneOrMoreOf(regExpLike('_a-zA-Z')).named('head'),
  oneOrMoreOf(
    sequenceOf([oneOrMoreOf(anyOf([regExpLike('a-zA-Z\\d'), stringLike('_')])).named('chars')])
      // language=JavaScript
      .withAction(`return chars.join('')`),
  ).named('tail'),
]).withAction(_identifierPattern1Action);

const identifierComponent = sequenceOf([anyOf([identifierPattern1, identifierPattern2]).named('identifier')]);

// language=JavaScript
const _action = `
  return toConstruct({
                       kind: "${IdentifierNode.kind}",
                       ${IdentifierNode.components.label.name}: identifier,
                     });
`;

export const identifierNodeRule = new Rule(ruleName, identifierComponent, _action);
