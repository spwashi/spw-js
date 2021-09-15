import { behaviorExpression } from '@grammar/ast/expressions/sequence/behavior/ref';
import { entityExpression } from '@grammar/ast/expressions/sequence/entity/ref';
import { locatedEntityExpression } from '@grammar/ast/expressions/sequence/located_entity/ref';
import { locatedConceptExpression } from '@grammar/ast/expressions/sequence/located_concept/ref';
import { locatedDomainExpression } from '@grammar/ast/expressions/sequence/located_domain/ref';
import { locatedEssenceExpression } from '@grammar/ast/expressions/sequence/located_essence/ref';
import { instanceExpression } from '@grammar/ast/expressions/sequence/instance/ref';

/**
 * Reference ArrayExpressions that are based on a specific sequence of constructs
 */
export const sequenceExpressions = [
  instanceExpression,
  entityExpression,
  behaviorExpression,
  locatedEntityExpression,
  locatedConceptExpression,
  locatedDomainExpression,
  locatedEssenceExpression,
];
