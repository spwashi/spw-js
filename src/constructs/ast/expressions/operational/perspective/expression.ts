import { Expression } from '../../_abstract/expression';
import { staticImplements } from '../../../_util/typescript/staticImplements';
import { Construct, IConstructClass } from '../../../_abstract/construct';
import { ComponentDescription } from '@constructs/ast/_abstract/_types';
import { DirectionOperator } from '@constructs/ast';
import { PerspectiveExpressionKind } from '@constructs/ast/expressions/operational/perspective/__types';

@staticImplements<IConstructClass<'perspective_expression'>>()
export class PerspectiveExpression extends Expression<PerspectiveExpressionKind> {
  static readonly kind = 'perspective_expression';

  static components = {
    source: Construct.makeComponent({ name: 'source' }),

    lens: Construct.makeComponent({ name: 'lens' }),

    target: Construct.makeComponent({
      name: 'target',
      generator: function* (target, ctxt) {
        let directionOperator;

        // todo: relic from hydration
        if (Array.isArray(target)) {
          [directionOperator, target] = target;
        }

        if (target) {
          yield [directionOperator ?? new DirectionOperator(), ctxt];
        }

        if (target) {
          yield [target, ctxt];
        }

        return null;
      },
      evaluators: {
        stringify: ([direction, target] = []) => [direction, target].join(''),
      },
    }),

    *[Symbol.iterator](): Generator<ComponentDescription> {
      yield this.source;
      yield this.lens;
      yield this.target;
    },
  };

  static isPerspectiveExpression(o: unknown): o is PerspectiveExpression {
    return (o as PerspectiveExpression)?.kind === this.kind;
  }
}
