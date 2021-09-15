import { Combinator } from '@spwashi/language/parsers/grammar';

export const componentize = (
  i: { pattern: Combinator; name: string | undefined } | Combinator,
): Combinator => {
  if (i instanceof Combinator) {
    return i;
  }
  return i.name ? i.pattern.named(i.name) : i.pattern;
};
