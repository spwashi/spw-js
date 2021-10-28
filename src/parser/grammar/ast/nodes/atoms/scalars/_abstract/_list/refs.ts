import { identifierNode } from '../../identifier/ref';
import { embedmentNode } from '../../embedment/ref';
import { numberNode } from '../../number/ref';
import { phraseNode } from '../../phrase/ref';
import { stringNode } from '../../string/ref';

export const scalars = [phraseNode, embedmentNode, stringNode, numberNode, identifierNode];
