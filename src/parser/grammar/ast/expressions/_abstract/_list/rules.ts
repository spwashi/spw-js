import { infixedExpressionRule } from '@grammar/ast/expressions/infixed/_abstract/rule';
import { commonExpressionRule } from '@grammar/ast/expressions/infixed/common/rule';
import { phraseExpressionRule } from '@grammar/ast/expressions/infixed/phrase/rule';
import { infixedAggregationExpressionRule } from '@grammar/ast/expressions/operations/aggregation/_variants/infix/rule';
import { prefixedAggregationExpressionRule } from '@grammar/ast/expressions/operations/aggregation/_variants/prefix/rule';
import { infixedBindingExpressionRule } from '@grammar/ast/expressions/operations/binding/_variants/infix/rule';
import { prefixedBindingExpressionRule } from '@grammar/ast/expressions/operations/binding/_variants/prefix/rule';
import { infixedRangeExpressionRule } from '@grammar/ast/expressions/operations/range/_variants/infix/rule';
import { prefixedRangeExpressionRule } from '@grammar/ast/expressions/operations/range/_variants/prefix/rule';
import { infixedReductionExpressionRule } from '@grammar/ast/expressions/operations/reduction/_variants/infix/rule';
import { prefixedReductionExpressionRule } from '@grammar/ast/expressions/operations/reduction/_variants/prefix/rule';
import { transformationExpressionRules } from '@grammar/ast/expressions/operations/transformation/_abstract/_list/rules';
import { postfixedExpressionRule } from '@grammar/ast/expressions/postfixed/_abstract/rule';
import { prefixedExpressionRule } from '@grammar/ast/expressions/prefixed/_abstract/rule';
import { sequenceExpressionRule } from '@grammar/ast/expressions/sequences/_abstract/rule';
import { behaviorExpressionRule } from '@grammar/ast/expressions/sequences/behavior/rule';
import { blockExpressionRule } from '@grammar/ast/expressions/sequences/block/rule';
import { entityExpressionRule } from '@grammar/ast/expressions/sequences/entity/rule';
import { instanceExpressionRule } from '@grammar/ast/expressions/sequences/instance/rule';
import { Rule } from '@spwashi/language/parsers/grammar';
import { expressionRule } from '../expression.rule';

export const expressionRules: Rule[] = [
  expressionRule,
  ...[
    behaviorExpressionRule,
    blockExpressionRule,
    commonExpressionRule,
    entityExpressionRule,
    infixedAggregationExpressionRule,
    infixedBindingExpressionRule,
    infixedExpressionRule,
    infixedRangeExpressionRule,
    infixedReductionExpressionRule,
    instanceExpressionRule,
    phraseExpressionRule,
    postfixedExpressionRule,
    prefixedAggregationExpressionRule,
    prefixedBindingExpressionRule,
    prefixedExpressionRule,
    prefixedRangeExpressionRule,
    prefixedReductionExpressionRule,
    sequenceExpressionRule,
    ...transformationExpressionRules,
  ].sort((a, b) => a.ruleName.localeCompare(b.ruleName)),
];
