import {SpwExpression} from '../../_abstract/expression';
import {staticImplements} from '../../../_util/staticImplements';
import {ISpwConstructStatic, SpwConstruct} from '../../../_abstract/construct';
import {ComponentDescription, SpwShape} from '@constructs/ast/_abstract/types';
import {DirectionOperator, Essence, PerspectiveOperator} from '@constructs/ast';

type Kind = 'perspective_expression';

@staticImplements<ISpwConstructStatic<'perspective_expression'>>()
export class PerspectiveExpression extends SpwExpression<Kind> {
    static readonly kind = 'perspective_expression';

    static components =
               {
                   source:
                       SpwConstruct.makeComponent({
                                                 name: 'source',
                                                 selector(subject: SpwShape) { return subject?.source; },
                                                 generator: function* (component, key, ctxt, mut) {
                                                     if (component) yield mut(component, key, ctxt);
                                                     yield ctxt;
                                                     return;
                                                 },
                                             }),

                   lens:
                       SpwConstruct.makeComponent({
                                                 name: 'lens',
                                                 selector(subject: SpwShape) {
                                                     return subject?.lens;
                                                 },
                                                 generator:  function* (lens, key, ctxt, mut) {
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
                                                 evaluators: {
                                                     stringify: ([atom, spec] = []) => [atom, spec].join(''),
                                                 },
                                             }),

                   target:
                       SpwConstruct.makeComponent({
                                                 name:       'target',
                                                 selector:   (subject: SpwShape) => subject?.target,
                                                 generator:  function* (target, key, ctxt, mut) {
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
                                                 evaluators: {
                                                     stringify: ([direction, target] = []) => [
                                                         direction, target,
                                                     ].join(''),
                                                 },
                                             }),

                   * [Symbol.iterator](): Generator<ComponentDescription> {
                       yield this.source;
                       yield this.lens;
                       yield this.target;
                   },
               };


    static isPerspectiveExpression(o: unknown): o is PerspectiveExpression {
        return (o as PerspectiveExpression)?.kind === this.kind;
    }
}