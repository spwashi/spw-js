import { flat } from '@grammar/ast/expressions/_util/componentize';
import { prefixedBindingExpression } from '@grammar/ast/expressions/operations/_kinds/binding/_variants/prefix/ref';
import { sequenceOf } from '@spwashi/language/parsers/grammar/combinators';
import { spaceComponent as __ } from './space';

const sequence = sequenceOf([__, prefixedBindingExpression].map(flat));
export const pattern = sequence;
