import { referenceTo } from '@spwashi/language/parsers/grammar/combinators';
import { Block } from '@constructs/ast/expressions/sequence/block/construct';

export const ruleName = Block.name;

export const block = referenceTo(ruleName);
