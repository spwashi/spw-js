import {anyOf, oneOrMoreOf, regExpLike, zeroOrMoreOf} from '@spwashi/language/parsers/grammar/combinators';

export const spaceTab = regExpLike('\\t ');
export const newline  = regExpLike('\\n');

const patterns =
          [
              spaceTab,
              newline.named('newline'),
          ];

// language=JavaScript
const _action                   = 'return newline';
export const optionalWhitespace = zeroOrMoreOf(anyOf(patterns).withAction(_action));
export const whitespace         = oneOrMoreOf(anyOf(patterns).withAction(_action));