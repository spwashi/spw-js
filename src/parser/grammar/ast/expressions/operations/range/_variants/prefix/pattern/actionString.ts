import { PrefixedRangeExpression } from '@constructs/ast';
import { itemComponent as item } from './item';
import { operatorComponent as operator } from './operator';

export const action =
  // language=JavaScript
  `
          return toConstruct(
            {
              kind: '${PrefixedRangeExpression.kind}',
              ${operator.name}: ${operator.name},
              ${item.name}: ${item.name},
            }
          );
        `;
