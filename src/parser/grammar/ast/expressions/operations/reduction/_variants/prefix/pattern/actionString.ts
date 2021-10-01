import { PrefixedReductionExpression } from '@constructs/ast';
import { itemComponent as item } from './item';
import { operatorComponent as operator } from './operator';

export const action =
  // language=JavaScript
  `
          return toConstruct(
            {
              kind: '${PrefixedReductionExpression.kind}',
              ${operator.name}: ${operator.name},
              ${item.name}: ${item.name},
            }
          );
        `;
