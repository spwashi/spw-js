// language=JavaScript
import { flat } from '@grammar/ast/expressions/_util/componentize';
import { prefixedAggregationExpression } from '@grammar/ast/expressions/operations/_kinds/aggregation/_variants/prefix/ref';
import { sequenceOf } from '@spwashi/language/parsers/grammar/combinators';
import { spaceComponent as __ } from './space';

const sequence = sequenceOf([__, prefixedAggregationExpression].map(flat));
export const pattern = sequence;
