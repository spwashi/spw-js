import { SpwConstruct } from '@constructs/ast/_abstract/spwConstruct';
import { Register } from '@constructs/runtime/register/register';

type RuntimeContext = Register<ConstructContext>;

export class ConstructContext extends SpwConstruct {
  static kind: 'context';

  setting?: RuntimeContext;

  push(context: ConstructContext): RuntimeContext {
    return new Register([...(this.setting?.flat ?? []), context]);
  }

  pop(): ConstructContext | null {
    return this.setting?.flat[0] ?? null;
  }
}
