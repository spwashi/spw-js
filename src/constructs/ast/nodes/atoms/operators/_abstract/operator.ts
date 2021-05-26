import {SpwNode} from '../../../_abstract/node';
import {ConstructKind} from '../../../../_types/kind';
import {ComponentDescription} from '@constructs/ast/_abstract/_types';
import {SpwConstruct, ConstructComponents} from '@constructs/ast/_abstract/spwConstruct';

/**
 * Operators have "side effects" in that they represent the invocation of
 * some semantic order that extends beyond the Operation's constituent parts
 */
export default abstract class SpwOperator<Kind extends ConstructKind = any> extends SpwNode<Kind> {
    static components: ConstructComponents =
               {
                   token:
                       SpwConstruct.makeComponent({
                                                 _fallback: null as any,
                                                 name:      'token',
                                                 selector:  function (s) {
                                                     return s?.token ?? this._fallback;
                                                 },
                                             }),
                   label:
                       SpwConstruct.makeComponent({
                                                 name: 'label',

                                                 evaluators:
                                                     {
                                                         stringify: function ([...l] = []) {
                                                             const label = l.join('');
                                                             return label.length ? `_${label}` : label;
                                                         },
                                                     },
                                             }),

                   * [Symbol.iterator](): Generator<ComponentDescription> {
                       yield this.token;
                       yield this.label;
                   },
               };

    protected static token: string | undefined = undefined;
}

export function operatorComponents({token}: { token: any }): ConstructComponents {
    return {
        ...SpwOperator.components,

        token:
            {
                ...SpwOperator.components.token,
                _fallback: token,
            },
    };
}