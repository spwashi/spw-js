import { ConstructKind } from '@constructs/top/kinds';
import { Operator } from '@constructs/ast/nodes/operators/_abstract/operator';

export class Delimiter<Kind extends ConstructKind = any> extends Operator<Kind> {}
