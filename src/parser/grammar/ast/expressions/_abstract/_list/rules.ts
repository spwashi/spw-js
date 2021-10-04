import { infixedExpressionRule } from '@grammar/ast/expressions/infixed/_abstract/rule';
import { blockExpressionRule } from '@grammar/ast/expressions/infixed/block/rule';
import { commonExpressionRule } from '@grammar/ast/expressions/infixed/common/rule';
import { phraseExpressionRule } from '@grammar/ast/expressions/infixed/phrase/rule';
import { aggregationExpressionRules } from '@grammar/ast/expressions/operations/_kinds/aggregation/_abstract/_list/rules';
import { bindingExpressionRules } from '@grammar/ast/expressions/operations/_kinds/binding/_abstract/_list/rules';
import { channelExpressionRules } from '@grammar/ast/expressions/operations/_kinds/channel/_abstract/_list/rules';
import { evaluationExpressionRules } from '@grammar/ast/expressions/operations/_kinds/evaluation/_abstract/_list/rules';
import { invocationExpressionRules } from '@grammar/ast/expressions/operations/_kinds/invocation/_abstract/_list/rules';
import { performanceExpressionRules } from '@grammar/ast/expressions/operations/_kinds/performance/_abstract/_list/rules';
import { perspectiveExpressionRules } from '@grammar/ast/expressions/operations/_kinds/perspective/_abstract/_list/rules';
import { rangeExpressionRules } from '@grammar/ast/expressions/operations/_kinds/range/_abstract/_list/rules';
import { reductionExpressionRules } from '@grammar/ast/expressions/operations/_kinds/reduction/_abstract/_list/rules';
import { transformationExpressionRules } from '@grammar/ast/expressions/operations/_kinds/transformation/_abstract/_list/rules';
import { postfixedExpressionRule } from '@grammar/ast/expressions/postfixed/_abstract/rule';
import { prefixedExpressionRule } from '@grammar/ast/expressions/prefixed/_abstract/rule';
import { sequenceExpressionRule } from '@grammar/ast/expressions/sequences/_abstract/rule';
import { behaviorExpressionRule } from '@grammar/ast/expressions/sequences/behavior/rule';
import { entityExpressionRule } from '@grammar/ast/expressions/sequences/entity/rule';
import { instanceExpressionRule } from '@grammar/ast/expressions/sequences/instance/rule';
import { Rule } from '@spwashi/language/parsers/grammar';
import { expressionRule } from '../rule';

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
    ...channelExpressionRules,
    ...evaluationExpressionRules,
    ...invocationExpressionRules,
    ...performanceExpressionRules,
    ...perspectiveExpressionRules,
    ...rangeExpressionRules,
    ...reductionExpressionRules,
    ...transformationExpressionRules,
  ].sort((a, b) => a.ruleName.localeCompare(b.ruleName)),
];
