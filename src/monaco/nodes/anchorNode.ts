import { rn_anchorNode, tok_anchorNode } from '../tokens';

export const anchorRules = {
  [rn_anchorNode]: [
    [
      /[a-zA-Z\d_]+[a-zA-Z_\-\d]*/,
      {
        token: tok_anchorNode,
      },
    ],
  ],
};
