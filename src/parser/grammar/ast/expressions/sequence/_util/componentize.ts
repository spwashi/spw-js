import { Combinator } from '../../../../../../../../ts-language/dist/parsers/grammar';

export const componentize = (i: { pattern: Combinator; name: string | undefined }): Combinator => {
  return i.name ? i.pattern.named(i.name) : i.pattern;
};
