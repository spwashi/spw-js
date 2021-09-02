import { sequenceExpressionRule } from '@grammar/ast/expressions/sequence/_abstract/sequence.rule';
import { locatedDomainExpressionRule } from '@grammar/ast/expressions/sequence/located_domain/rule';
import { locatedConceptExpressionRule } from '@grammar/ast/expressions/sequence/located_concept/rule';
import { locatedEntityExpressionRule } from '@grammar/ast/expressions/sequence/located_entity/rule';
import { locatedEssenceExpressionRule } from '@grammar/ast/expressions/sequence/located_essence/rule';
import { behaviorExpressionRule } from '@grammar/ast/expressions/sequence/behavior/rule';
import { entityExpressionRule } from '@grammar/ast/expressions/sequence/entity/rule';

export const sequenceExpressionRules = [
  behaviorExpressionRule,
  entityExpressionRule,
  locatedConceptExpressionRule,
  locatedDomainExpressionRule,
  locatedEntityExpressionRule,
  locatedEssenceExpressionRule,
  sequenceExpressionRule,
];
