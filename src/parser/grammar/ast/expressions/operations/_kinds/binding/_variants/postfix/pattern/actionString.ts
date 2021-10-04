import { PostfixedBindingExpression } from '@constructs/ast';
import { headComponent as head } from './head';
import { tailComponent as tail } from './tail';

export const action =
  // language=JavaScript
  `
                 return toConstruct(
                   {
                     kind: '${PostfixedBindingExpression.kind}',
                     ${tail.name}: ${tail.name},
                     ${head.name}: ${head.name},
                   }
                 );
               `;
