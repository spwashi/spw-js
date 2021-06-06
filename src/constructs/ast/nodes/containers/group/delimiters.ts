import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import {
  ConstructComponents,
  ISpwConstructStatic,
} from '@constructs/ast/_abstract/spwConstruct';
import { IAtomicSpwOperatorStatic } from '@constructs/ast/nodes/atoms/operators/_abstract/_types/atomic';
import { SpwDelimiter } from '@constructs/ast/nodes/atoms/operators/delimiters/_abstract/delimiter';
import { operatorComponents } from '@constructs/ast/nodes/atoms/operators/_abstract/operator';

export type OpenGroupToken = '(';
export type CloseGroupToken = ')';

@staticImplements<
  ISpwConstructStatic<'group_objective'> & IAtomicSpwOperatorStatic<'('>
>()
export class GroupObjectiveDelimiter extends SpwDelimiter<'group_objective'> {
  static kind: 'group_objective' = 'group_objective';

  static token: OpenGroupToken = '(';

  static components: ConstructComponents = operatorComponents(
    GroupObjectiveDelimiter,
  );
}

@staticImplements<
  ISpwConstructStatic<'group_subjective'> & IAtomicSpwOperatorStatic<')'>
>()
export class GroupSubjectiveDelimiter extends SpwDelimiter<'group_subjective'> {
  static kind: 'group_subjective' = 'group_subjective';

  static token: CloseGroupToken = ')';

  static components: ConstructComponents = operatorComponents(
    GroupSubjectiveDelimiter,
  );
}
