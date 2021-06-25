import { Tokenizer } from './_types/types';
import { nodeRules } from './nodes/node';
import { rn_node } from './tokens';
import { tokenizerState } from './util/tokenizerState';

export { Tokenizer };
export * from './tokens';

export const tokenizer: Tokenizer = {
  root: [{ include: tokenizerState(rn_node) }],
  ...nodeRules,
};
