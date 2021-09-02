import {
  anyOf,
  oneOrMoreOf,
  regExpLike,
  stringLike,
} from '@spwashi/language/parsers/grammar/combinators';
import { NodeDelimitingOperator } from '@constructs/ast/nodes/operators/semantic/node/construct';

const tab = regExpLike('\\t');
export const space = stringLike(NodeDelimitingOperator.token);
export const newline = regExpLike('\\n');
export const spaceTab = anyOf([space, tab]);
const patterns = [tab, space, newline.named('newline')];

// language=JavaScript
const _action = 'return newline';
export const whitespace = oneOrMoreOf(anyOf(patterns).withAction(_action));
