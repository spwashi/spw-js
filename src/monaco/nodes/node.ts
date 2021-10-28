import { Tokenizer } from '../_types/types';
import {
  rn_identifierNode,
  rn_container,
  rn_embedmentNode_open,
  rn_node,
  rn_operator,
  rn_stringNode_open,
} from '../tokens';
import { tokenizerState } from '../util/tokenizerState';
import { identifierRules } from './identifierNode';
import { containerRules } from './containers';
import { embedmentRules } from './embedment';
import { operatorRules } from './operators';
import { stringRules } from './string';

export const nodeRules: Tokenizer = {
  [rn_node]: [
    { include: tokenizerState(rn_identifierNode) },
    { include: tokenizerState(rn_operator) },
    { include: tokenizerState(rn_container) },
    { include: tokenizerState(rn_stringNode_open) },
    { include: tokenizerState(rn_embedmentNode_open) },
  ],
  ...identifierRules,
  ...containerRules,
  ...operatorRules,
  ...stringRules,
  ...embedmentRules,
};
