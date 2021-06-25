import { Construct } from '../../../ast/_abstract/construct';
import { Register } from '@constructs/runtime/register/register';
import { ConstructContextKind } from '@constructs/runtime/context/interfaces/__types';

type RuntimeContext = Register<ConstructContext>;

export class ConstructContext extends Construct {
  static kind: ConstructContextKind = 'context';

  setting?: RuntimeContext;

  push(context: ConstructContext): RuntimeContext {
    return new Register([...(this.setting?.flat ?? []), context]);
  }

  pop(): ConstructContext | null {
    return this.setting?.flat[0] ?? null;
  }
}
