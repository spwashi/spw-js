import { InfixedRangeExpression } from '@constructs/ast';
import { headComponent } from './head';
import { tailComponent } from './tail';

export const actionString =
  // language=JavaScript
  `
                 return toConstruct({
                                      kind: '${InfixedRangeExpression.kind}',
                                      ${headComponent.name}: ${headComponent.name},
                                      ${tailComponent.name}: ${tailComponent.name},
                                    })
               `;
