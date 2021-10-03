import { headComponent } from './head';
import { tailComponent } from './tail';
import { flat } from '@grammar/ast/expressions/_util/componentize';
import { spaceNode } from '@grammar/utility/space/space.ref';
import { sequenceOf, zeroOrMoreOf } from '@spwashi/language/parsers/grammar/combinators';

const __ = zeroOrMoreOf(spaceNode);
export const pattern = sequenceOf([headComponent, __, tailComponent].map(flat));
