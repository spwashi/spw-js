import { flat } from '@grammar/ast/expressions/_util/componentize';
import { newline, spaceTab } from '@grammar/utility/space/whitespace.patterns';
import { anyOf, sequenceOf, zeroOrMoreOf } from '@spwashi/language/parsers/grammar/combinators';
import { action } from './actionString';
import { headComponent as head } from './head';
import { tailComponent as tail } from './tail';

const __ = zeroOrMoreOf(anyOf([spaceTab, newline]));
export const pattern = sequenceOf([head, __, tail, __].map(flat)).withAction(action);
