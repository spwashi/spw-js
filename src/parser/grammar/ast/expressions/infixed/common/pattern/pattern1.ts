// Head and Tail
import { flat } from '@grammar/ast/expressions/_util/componentize';
import { sequenceOf } from '@spwashi/language/parsers/grammar/combinators';
import { headComponent } from './_components/_combo/head';
import { tailComponent } from './_components/_combo/tail';

// language=JavaScript

const pattern = sequenceOf([headComponent, tailComponent].map(flat));
const action = `return [...${headComponent.name}, ${tailComponent.name}];`;
export const pattern1 = pattern.withAction(action);
