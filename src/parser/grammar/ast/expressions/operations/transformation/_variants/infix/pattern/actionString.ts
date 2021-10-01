import { InfixedTransformationExpression } from '@constructs/ast';
import { headComponent } from './head';
import { tailComponent } from './tail';

export const actionString =
  // language=JavaScript
  `
                 return toConstruct({
                                      kind: '${InfixedTransformationExpression.kind}',
                                      ${headComponent.name}: ${headComponent.name},
                                      ${tailComponent.name}: ${tailComponent.name},
                                    })
               `;
