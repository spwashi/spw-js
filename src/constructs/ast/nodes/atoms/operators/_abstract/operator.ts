import {SpwNode} from '../../../_abstract/node';
import {SpwItemKind} from '../../../../_types/kind';
import {ComponentPrototype, SpwItemJunction, SpwShape} from '@constructs/ast/_abstract/types';

/**
 * Operators have "side effects" in that they represent the invocation of
 * some semantic order that extends beyond the Operation's constituent parts
 */
export default abstract class SpwOperator<Kind extends SpwItemKind = SpwShape,
    Junction extends SpwItemJunction = SpwItemJunction> extends SpwNode<Kind, Junction> {

    protected static token: string | undefined = undefined;

    static get tokenComponent(): ComponentPrototype {
        const constructor = <typeof SpwOperator>this;
        return {
            componentName: 'token',
            selector(subject: SpwShape) {
                return subject?.token ?? constructor.token;
            },
            generator: function* (item, key, ctxt, mut) {
                yield mut(item || constructor.token, key, ctxt);
                yield ctxt;
                return;
            },
        }
    }

    static get label(): ComponentPrototype {
        return {
            componentName: 'label',
            selector(subject: SpwShape) {
                return subject?.label;
            },
            generator: function* (item, key, ctxt, mut) {
                yield mut(item, key, ctxt);
                yield ctxt;
                return;
            },
            evaluator: {
                stringify: function ([...l] = []) {
                    const label = l.join('');
                    return label.length ? `_${label}` : label;
                },
            },
        }
    }

    static getComponentPrototypes(): ComponentPrototype[] {
        return [
            this.tokenComponent,
            this.label,
        ]
    }
}