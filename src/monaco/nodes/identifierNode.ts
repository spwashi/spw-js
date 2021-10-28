import { rn_identifierNode, tok_identifierNode } from '../tokens';

export const identifierRules = {
  [rn_identifierNode]: [
    [
      /[a-zA-Z\d_]+[a-zA-Z_\-\d]*/,
      {
        token: tok_identifierNode,
      },
    ],
  ],
};
