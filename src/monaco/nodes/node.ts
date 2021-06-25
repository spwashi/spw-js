import { Tokenizer } from '../_types/types';
import { rn_anchorNode, rn_container, rn_node, rn_operator, rn_stringNode_open } from '../tokens';
import { anchorRules } from './anchorNode';
import { stringRules } from './string';
import { containerRules } from './containers';
import { operatorRules } from './operators';
import { tokenizerState } from '../util/tokenizerState';

export const nodeRules: Tokenizer = {
  [rn_node]: [
    { include: tokenizerState(rn_anchorNode) },
    { include: tokenizerState(rn_operator) },
    { include: tokenizerState(rn_container) },
    { include: tokenizerState(rn_stringNode_open) },
  ],
  ...anchorRules,
  ...containerRules,
  ...operatorRules,
  ...stringRules,
};
