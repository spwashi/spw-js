import { Construct } from '../../../ast/_abstract/construct';
import { Register } from '@constructs/runtime/register/register';

type RuntimeContext = Register<ConstructContext>;

export class ConstructContext extends Construct {
  static kind: 'context';

  setting?: RuntimeContext;

  push(context: ConstructContext): RuntimeContext {
    return new Register([...(this.setting?.flat ?? []), context]);
  }

  pop(): ConstructContext | null {
    return this.setting?.flat[0] ?? null;
  }
}
