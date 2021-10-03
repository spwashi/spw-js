import { PrefixedReductionExpression } from '@constructs/ast';
import { tailComponent as tail } from './tail';
import { headComponent as head } from './head';

export const action =
  // language=JavaScript
  `
          return toConstruct(
            {
              kind: '${PrefixedReductionExpression.kind}',
              ${head.name}: ${head.name},
              ${tail.name}: ${tail.name},
            }
          );
        `;
