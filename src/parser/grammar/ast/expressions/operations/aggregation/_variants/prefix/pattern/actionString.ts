import { PrefixedAggregationExpression } from '@constructs/ast';
import { headComponent as head } from './head';
import { tailComponent as tail } from './tail';

export const action =
  // language=JavaScript
  `
                 return toConstruct(
                   {
                     kind: '${PrefixedAggregationExpression.kind}',
                     ${head.name}: ${head.name},
                     ${tail.name}: ${tail.name},
                   }
                 );
               `;
