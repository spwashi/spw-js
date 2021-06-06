import {
  containerDelimiters,
  containers,
} from '../../containers/_abstract/_list/container.list.ref';
import { atoms } from '../../atoms/_abstract/_list/atom.list.ref';
import { scalars } from '../../atoms/scalar/_abstract/_list/scalar.list.ref';
import { operators } from '@grammar/ast/nodes/atoms/operator/_abstract/_list/operator.list.ref';

export const nodes = [...containers, ...atoms];

export const compositionalNodes = [...containers, ...scalars];

export const conceptualNodes = [...containerDelimiters, ...operators];
