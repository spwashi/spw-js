import { Rule } from '@spwashi/language/parsers/grammar';
import { oneOrMoreOf, sequenceOf } from '@spwashi/language/parsers/grammar/combinators';
import { ruleName } from './space.ref';
import { whitespace } from './whitespace.patterns';

// language=JavaScript
const _action = `return constructs.space();`;
export const spaceNodeRule = new Rule(
  ruleName,
  sequenceOf([oneOrMoreOf(whitespace).named('newlines')]).withAction(_action),
);
