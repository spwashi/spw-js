import { infixedExpressionRule } from '@grammar/ast/expressions/infixed/_abstract/rule';
import { blockExpressionRule } from '@grammar/ast/expressions/infixed/block/rule';
import { commonExpressionRule } from '@grammar/ast/expressions/infixed/common/rule';
import { phraseExpressionRule } from '@grammar/ast/expressions/infixed/phrase/rule';
import { aggregationExpressionRules } from '@grammar/ast/expressions/operations/aggregation/_abstract/_list/rules';
import { bindingExpressionRules } from '@grammar/ast/expressions/operations/binding/_abstract/_list/rules';
import { rangeExpressionRules } from '@grammar/ast/expressions/operations/range/_abstract/_list/rules';
import { reductionExpressionRules } from '@grammar/ast/expressions/operations/reduction/_abstract/_list/rules';
import { transformationExpressionRules } from '@grammar/ast/expressions/operations/transformation/_abstract/_list/rules';
import { postfixedExpressionRule } from '@grammar/ast/expressions/postfixed/_abstract/rule';
import { prefixedExpressionRule } from '@grammar/ast/expressions/prefixed/_abstract/rule';
import { sequenceExpressionRule } from '@grammar/ast/expressions/sequences/_abstract/rule';
import { behaviorExpressionRule } from '@grammar/ast/expressions/sequences/behavior/rule';
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
    instanceExpressionRule,
    phraseExpressionRule,
    infixedExpressionRule,
    postfixedExpressionRule,
    prefixedExpressionRule,
    sequenceExpressionRule,
    ...aggregationExpressionRules,
    ...bindingExpressionRules,
    ...rangeExpressionRules,
    ...reductionExpressionRules,
    ...transformationExpressionRules,
  ].sort((a, b) => a.ruleName.localeCompare(b.ruleName)),
];
