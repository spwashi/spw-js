import {ISpwConstructStatic, SpwConstruct} from '../../../../_abstract/construct';
import {staticImplements} from '../../../../_util/staticImplements';
import {SpwNode} from '@constructs/ast/nodes/_abstract/node';
import {ComponentDescription} from '@constructs/ast/_abstract/types';

@staticImplements<ISpwConstructStatic<'anchor'>>()
export class AnchorNode extends SpwNode<'anchor'> {
    static readonly kind = 'anchor';

    static components =
               {
                   label:
                       SpwConstruct.makeComponent({
                                                 name:     'label',
                                                 selector: s => s.label,
                                             }),

                   * [Symbol.iterator](): Generator<ComponentDescription> {
                       yield this.label;
                   },
               };

    static isAnchorNode(o: unknown): o is AnchorNode {
        return (o as AnchorNode)?.kind === this.kind;
    }
}