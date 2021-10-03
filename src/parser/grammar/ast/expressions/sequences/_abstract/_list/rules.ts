import { sequenceExpressionRule } from '@grammar/ast/expressions/sequences/_abstract/rule';
import { behaviorExpressionRule } from '@grammar/ast/expressions/sequences/behavior/rule';
import { blockExpressionRule } from '@grammar/ast/expressions/sequences/block/rule';
import { entityExpressionRule } from '@grammar/ast/expressions/sequences/entity/rule';
import { instanceExpressionRule } from '@grammar/ast/expressions/sequences/instance/rule';
import { locatedConceptExpressionRule } from '@grammar/ast/expressions/sequences/located_concept/rule';
import { locatedDomainExpressionRule } from '@grammar/ast/expressions/sequences/located_domain/rule';
import { locatedEntityExpressionRule } from '@grammar/ast/expressions/sequences/located_entity/rule';
import { locatedEssenceExpressionRule } from '@grammar/ast/expressions/sequences/located_essence/rule';
import { Rule } from '@spwashi/language/parsers/grammar';

export const sequenceExpressionRules: Rule[] = [
  blockExpressionRule,
  instanceExpressionRule,
  behaviorExpressionRule,
  entityExpressionRule,

  // located constructs
  locatedConceptExpressionRule,
  locatedDomainExpressionRule,
  locatedEntityExpressionRule,
  locatedEssenceExpressionRule,

  // generic
  sequenceExpressionRule,
];
