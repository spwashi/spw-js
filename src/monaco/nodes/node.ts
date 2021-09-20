import { Tokenizer } from '../_types/types';
import {
  rn_anchorNode,
  rn_container,
  rn_embedmentNode_open,
  rn_node,
  rn_operator,
  rn_stringNode_open,
} from '../tokens';
import { tokenizerState } from '../util/tokenizerState';
import { anchorRules } from './anchorNode';
import { containerRules } from './containers';
import { embedmentRules } from './embedment';
import { operatorRules } from './operators';
import { stringRules } from './string';

export const nodeRules: Tokenizer = {
  [rn_node]: [
    { include: tokenizerState(rn_anchorNode) },
    { include: tokenizerState(rn_operator) },
    { include: tokenizerState(rn_container) },
    { include: tokenizerState(rn_stringNode_open) },
    { include: tokenizerState(rn_embedmentNode_open) },
  ],
  ...anchorRules,
  ...containerRules,
  ...operatorRules,
  ...stringRules,
  ...embedmentRules,
};
