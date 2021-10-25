import { IConstructComponent } from '../../../_abstract/_types/IConstructComponent';
import { ConstructComponent } from '@constructs/ast/_abstract/component/component';
import { ConstructComponents } from '@constructs/ast/_abstract/construct';
import { ConstructKind } from '@constructs/top/kinds';
import { Node } from '@constructs/ast/nodes/_abstract/node';

/**
 * Operators have "side effects" in that they represent the invocation of
 * some semantic order that extends beyond the Operation's constituent parts
 */
export abstract class Operator<Kind extends ConstructKind = any> extends Node<Kind> {
  static components: ConstructComponents = {
    _fallback: null,
    token: new ConstructComponent({
      name: 'token',
      valueSelector: function (s) {
        return s?.token ?? this._fallback;
      },
    }),
    label: new ConstructComponent({
      name: 'label',
      subjectEvaluators: {
        stringify: function ([...l] = []) {
          const label = l.join('');
          return label.length ? `_${label}` : label;
        },
      },
    }),

    *[Symbol.iterator](): Generator<IConstructComponent> {
      yield this.token;
      yield this.label;
    },
  };

  protected static token: string | undefined = undefined;
}

export function operatorComponents({ token }: { token: any }): ConstructComponents {
  return {
    ...Operator.components,

    token: {
      ...Operator.components.token,
      _fallback: token,
    },
  };
}
