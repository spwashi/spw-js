import { flat } from '@grammar/ast/expressions/_util/componentize';
import { newline, spaceTab } from '@grammar/utility/space/whitespace.patterns';
import { anyOf, sequenceOf, zeroOrMoreOf } from '@spwashi/language/parsers/grammar/combinators';
import { itemComponent as item } from './tail';
import { operatorComponent as operator } from './head';
import { action } from './actionString';

const __ = zeroOrMoreOf(anyOf([spaceTab, newline]));
export const pattern = sequenceOf([operator, __, item, __].map(flat)).withAction(action);
