import { ComponentDescription } from '@constructs/ast/_abstract/_types';
import { Construct, ConstructComponents } from '@constructs/ast/_abstract/construct';
import { ConstructKind } from '@constructs/ast/_types/kinds';
import { Node } from '@constructs/ast/nodes/_abstract/node';

/**
 * Operators have "side effects" in that they represent the invocation of
 * some semantic order that extends beyond the Operation's constituent parts
 */
export abstract class Operator<Kind extends ConstructKind = any> extends Node<Kind> {
  static components: ConstructComponents = {
    token: Construct.makeComponent({
      _fallback: null as any,
      name: 'token',
      selector: function (s) {
        return s?.token ?? this._fallback;
      },
    }),
    label: Construct.makeComponent({
      name: 'label',

      evaluators: {
        stringify: function ([...l] = []) {
          const label = l.join('');
          return label.length ? `_${label}` : label;
        },
      },
    }),

    *[Symbol.iterator](): Generator<ComponentDescription> {
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
