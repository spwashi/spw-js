import {Rule} from '@spwashi/language/parsers/grammar';
import {whitespace} from './whitespace.patterns';
import {ruleName} from './space.ref';
import {oneOrMoreOf, sequenceOf} from '@spwashi/language/parsers/grammar/combinators';

// language=JavaScript
const _action = `return constructs.space();`;
export const spaceNodeRule = new Rule(ruleName, sequenceOf([oneOrMoreOf(whitespace).named('newlines')]).withAction(_action));
