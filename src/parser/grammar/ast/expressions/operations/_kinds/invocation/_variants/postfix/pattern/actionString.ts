import { PostfixedInvocationExpression } from '@constructs/ast';
import { headComponent as head } from './head';
import { tailComponent as tail } from './tail';

export const action =
  // language=JavaScript
  `
                 return toConstruct(
                   {
                     kind: '${PostfixedInvocationExpression.kind}',
                     ${tail.name}: ${tail.name},
                     ${head.name}: ${head.name},
                   }
                 );
               `;
