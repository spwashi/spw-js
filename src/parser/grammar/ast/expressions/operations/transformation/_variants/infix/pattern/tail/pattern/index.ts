// language=JavaScript
import { flat } from '@grammar/ast/expressions/_util/componentize';
import { prefixedTransformationExpression } from '@grammar/ast/expressions/operations/transformation/_variants/prefix/ref';
import { sequenceOf } from '@spwashi/language/parsers/grammar/combinators';
import { spaceComponent as __ } from './space';

const sequence = sequenceOf([__, prefixedTransformationExpression].map(flat));
export const pattern = sequence;
