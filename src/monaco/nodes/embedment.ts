import { rn_embedmentBody, rn_embedmentNode_open, tok_embedmentQuote } from '../tokens';
import { tokenizerState } from '../util/tokenizerState';

const r_escapedQuote_embedmentBody = [/[^\\`]+/, 'embedment'];
const r_anyChar_embedmentBody = [
  new RegExp('[^`]+'),
  {
    token: rn_embedmentNode_open,
  },
];
const r_quote_embedmentNode_open = [
  /`/,
  {
    token: tok_embedmentQuote,
    next: tokenizerState(rn_embedmentBody),
  },
];
const r_quote_embedmentNode_pop = [
  new RegExp('`'),
  {
    token: tok_embedmentQuote,
    next: '@pop',
  },
];

export const embedmentRules = {
  [rn_embedmentNode_open]: [r_quote_embedmentNode_open],
  [rn_embedmentBody]: [
    r_anyChar_embedmentBody,
    r_escapedQuote_embedmentBody,
    r_quote_embedmentNode_pop,
  ],
};
