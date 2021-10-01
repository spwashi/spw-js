import { headComponent } from '@grammar/ast/expressions/operations/reduction/_variants/infix/pattern/head';
import { tailComponent } from '@grammar/ast/expressions/operations/reduction/_variants/infix/pattern/tail';
import { flat } from '@grammar/ast/expressions/_util/componentize';
import { spaceNode } from '@grammar/utility/space/space.ref';
import { sequenceOf, zeroOrMoreOf } from '@spwashi/language/parsers/grammar/combinators';

const __ = zeroOrMoreOf(spaceNode);
export const pattern = sequenceOf([headComponent, __, tailComponent].map(flat));
