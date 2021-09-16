import { sequenceExpressionRule } from '@grammar/ast/expressions/sequence/_abstract/sequence.rule';
import { behaviorExpressionRule } from '@grammar/ast/expressions/sequence/behavior/rule';
import { blockExpressionRule } from '@grammar/ast/expressions/sequence/block/rule';
import { entityExpressionRule } from '@grammar/ast/expressions/sequence/entity/rule';
import { instanceExpressionRule } from '@grammar/ast/expressions/sequence/instance/rule';
import { locatedConceptExpressionRule } from '@grammar/ast/expressions/sequence/located_concept/rule';
import { locatedDomainExpressionRule } from '@grammar/ast/expressions/sequence/located_domain/rule';
import { locatedEntityExpressionRule } from '@grammar/ast/expressions/sequence/located_entity/rule';
import { locatedEssenceExpressionRule } from '@grammar/ast/expressions/sequence/located_essence/rule';
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
