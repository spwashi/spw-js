import {
  anyOf,
  oneOrMoreOf,
  regExpLike,
  stringLike,
  zeroOrMoreOf,
} from '@spwashi/language/parsers/grammar/combinators';
import { OperatorDelimiter } from '@constructs/ast/nodes/atoms/operators/delimiters/operator/delimiter';

export const tab = regExpLike('\\t');
export const space = stringLike(OperatorDelimiter.token);
export const newline = regExpLike('\\n');
export const spaceTab = anyOf([space, tab]);
const patterns = [tab, space, newline.named('newline')];

// language=JavaScript
const _action = 'return newline';
export const optionalWhitespace = zeroOrMoreOf(
  anyOf(patterns).withAction(_action),
);
export const whitespace = oneOrMoreOf(anyOf(patterns).withAction(_action));
