import { Block } from '@constructs/ast/expressions/sequence/block/construct';
import { referenceTo } from '@spwashi/language/parsers/grammar/combinators';

export const ruleName = Block.name;

export const block = referenceTo(ruleName);
