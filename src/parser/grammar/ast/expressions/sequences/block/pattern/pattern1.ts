// Head and Tail
import { flat } from '@grammar/ast/expressions/_util/componentize';
import { headComponent } from '@grammar/ast/expressions/sequences/block/pattern/_components/_combo/head';
import { tailComponent } from '@grammar/ast/expressions/sequences/block/pattern/_components/_combo/tail';
import { sequenceOf } from '@spwashi/language/parsers/grammar/combinators';

// language=JavaScript

const pattern = sequenceOf([headComponent, tailComponent].map(flat));
const action = `return [...${headComponent.name}, ${tailComponent.name}];`;
export const pattern1 = pattern.withAction(action);
