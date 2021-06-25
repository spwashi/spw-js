import { rn_stringBody, rn_stringNode_open, tok_stringQuote } from '../tokens';
import { tokenizerState } from '../util/tokenizerState';

const r_escapedQuote_stringBody = [/[^\\"]+/, 'string'];
const r_anyChar_stringBody = [
  new RegExp('[^"]+'),
  {
    token: rn_stringNode_open,
  },
];
const r_quote_stringNode_open = [
  /"/,
  {
    token: tok_stringQuote,
    next: tokenizerState(rn_stringBody),
  },
];
const r_quote_stringNode_pop = [
  new RegExp('"'),
  {
    token: tok_stringQuote,
    next: '@pop',
  },
];

export const stringRules = {
  [rn_stringNode_open]: [r_quote_stringNode_open],
  [rn_stringBody]: [r_anyChar_stringBody, r_escapedQuote_stringBody, r_quote_stringNode_pop],
};
