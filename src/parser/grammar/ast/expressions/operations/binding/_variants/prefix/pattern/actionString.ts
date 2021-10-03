import { PrefixedBindingExpression } from '@constructs/ast';
import { itemComponent as item } from './tail';
import { operatorComponent as operator } from './head';

export const action =
  // language=JavaScript
  `
          return toConstruct(
            {
              kind: '${PrefixedBindingExpression.kind}',
              ${operator.name}: ${operator.name},
              ${item.name}: ${item.name},
            }
          );
        `;
