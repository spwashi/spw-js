import {ComponentPrototype, SpwShape} from '@constructs/ast/_abstract/types';
import {RawSpwItem} from '@constructs/ast/_abstract/interfaces/internal';

/**
 * Returns an object that describes a very generic component
 */
export function getDefaultComponentPrototype(): Omit<ComponentPrototype<SpwShape>, 'componentName'> | ComponentPrototype {
    return {
        selector:  function (s) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const componentName = <string | undefined>this.componentName;
            if (!componentName) return null;
            return s[componentName as string]
        },
        generator: function* (component, key, ctxt, mut) {
            if (typeof component === 'object' && component && typeof component[Symbol.iterator] === 'function') {
                for (const sub of component) {
                    yield mut(sub, key, ctxt);
                }
            } else if (component) {
                yield mut(component, key, ctxt);
            }
            yield ctxt;
            return;
        },
        evaluator: {
            hydrate:   function (items: RawSpwItem[] | undefined) {
                return items;
            },
            stringify: function (items) {
                return Array.from(items ?? []).join('');
            },
        },
    } as Omit<ComponentPrototype<SpwShape>, 'componentName'>;
}