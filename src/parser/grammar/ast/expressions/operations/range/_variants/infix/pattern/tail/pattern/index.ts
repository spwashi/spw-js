// language=JavaScript
import { flat } from '@grammar/ast/expressions/_util/componentize';
import { prefixedRangeExpression } from '@grammar/ast/expressions/operations/range/_variants/prefix/ref';
import { sequenceOf } from '@spwashi/language/parsers/grammar/combinators';
import { spaceComponent as __ } from './space';

const sequence = sequenceOf([__, prefixedRangeExpression].map(flat));
export const pattern = sequence;
