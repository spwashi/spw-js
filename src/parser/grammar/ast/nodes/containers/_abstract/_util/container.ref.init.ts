import {
  referenceTo,
  RuleReferenceCombinator,
} from '@spwashi/language/parsers/grammar/combinators';

type Ref = RuleReferenceCombinator;
export function getContainerNodeComponentReferences(ruleName: string): {
  open: Ref;
  body: Ref;
  close: Ref;
} {
  return {
    open: referenceTo(`${ruleName}Open`),
    body: referenceTo(`${ruleName}Body`),
    close: referenceTo(`${ruleName}Close`),
  };
}
