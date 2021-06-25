import { ConstructKind } from '@constructs/ast/_types/kinds';
import Operator from '@constructs/ast/nodes/atoms/operators/_abstract/operator';

export class Delimiter<Kind extends ConstructKind = any> extends Operator<Kind> {}
