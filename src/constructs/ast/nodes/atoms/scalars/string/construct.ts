import {SpwNode} from '../../../_abstract/node';
import {ISpwConstructStatic, SpwConstruct} from '../../../../_abstract/spwConstruct';
import {staticImplements} from '../../../../_util/staticImplements';
import {ComponentDescription, ComponentEvaluatorObject} from '@constructs/ast/_abstract/_types';


@staticImplements<ISpwConstructStatic<'string'>>()
export class StringNode extends SpwNode<'string'> {
    static readonly kind = 'string';

    static components =
               {
                   open:
                       SpwConstruct.makeComponent({
                                                 name: 'open',

                                                 selector:
                                                     () => '"',
                                             }),

                   body:
                       SpwConstruct.makeComponent({
                                                 name: 'body',

                                                 evaluators:
                                                     {
                                                         stringify: (s: string[] | undefined) => Array.from(s ?? []).filter(Boolean).join(''),
                                                     } as ComponentEvaluatorObject,
                                             }),

                   close:
                       SpwConstruct.makeComponent({
                                                 name: 'close',

                                                 selector:
                                                     () => '"',
                                             }),

                   * [Symbol.iterator](): Generator<ComponentDescription> {
                       yield this.open
                       yield this.body
                       yield this.close
                   },
               }

    static isStringNode(o: unknown): o is StringNode {
        return (o as StringNode)?.kind === this.kind;
    }
}