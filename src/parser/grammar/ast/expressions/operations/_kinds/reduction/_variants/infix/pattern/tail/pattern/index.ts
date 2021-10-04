// language=JavaScript
import { flat } from '@grammar/ast/expressions/_util/componentize';
import { prefixedReductionExpression } from '@grammar/ast/expressions/operations/_kinds/reduction/_variants/prefix/ref';
import { sequenceOf } from '@spwashi/language/parsers/grammar/combinators';
import { spaceComponent as __ } from './space';

const sequence = sequenceOf([__, prefixedReductionExpression].map(flat));
export const pattern = sequence;
