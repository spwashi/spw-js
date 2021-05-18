import {SpwExpression} from '../../_abstract/expression';
import {staticImplements} from '../../../_util/staticImplements';
import {ISpwItemStatic} from '../../../_abstract/item';
import {ComponentPrototype, SpwShape} from '@constructs/ast/_abstract/types';
import {DirectionOperator, Essence, PerspectiveOperator} from '@constructs/ast';

type Kind = 'perspective_expression';

@staticImplements<ISpwItemStatic<'perspective_expression'>>()
export class PerspectiveExpression extends SpwExpression<Kind> {
    static readonly kind = 'perspective_expression';

    static get source(): ComponentPrototype {
        return {
            componentName: 'source',
            selector(subject: SpwShape) { return subject?.source; },
            generator: function* (component, key, ctxt, mut) {
                if (component) yield mut(component, key, ctxt);
                yield ctxt;
                return;
            },
        }
    }

    static get lens(): ComponentPrototype {
        return {
            componentName: 'lens',
            selector(subject: SpwShape) {
                return subject?.lens;
            },
            generator: function* (lens, key, ctxt, mut) {
                let atom;
                let spec;
                if (Array.isArray(lens)) {
                    ([atom, spec] = lens)
                } else {
                    ({atom, spec} = lens)
                }
                if (atom) yield mut(atom || new PerspectiveOperator(), key, ctxt);
                if (spec) yield mut(spec || new Essence(), key, ctxt);
                yield ctxt;
                return;
            },
            evaluator: {
                stringify: ([atom, spec] = []) => [atom, spec].join(''),
            },
        }
    }

    static get target(): ComponentPrototype {
        return {
            componentName: 'target',
            selector:      (subject: SpwShape) => subject?.target,
            generator:     function* (target, key, ctxt, mut) {
                let directionOperator;

                // todo: relic from hydration
                if (Array.isArray(target)) {
                    ([directionOperator, target] = target)
                }

                if (target) yield mut(directionOperator ?? new DirectionOperator(), key, ctxt);
                if (target) yield mut(target, key, ctxt);
                yield ctxt;
                return;
            },
            evaluator:     {
                stringify: ([direction, target] = []) => [direction, target].join(''),
            },
        }
    }

    static isPerspectiveExpression(o: unknown): o is PerspectiveExpression {
        return (o as PerspectiveExpression)?.kind === this.kind;
    }

    static getComponentPrototypes(): ComponentPrototype[] {
        return [this.source, this.lens, this.target];
    }
}