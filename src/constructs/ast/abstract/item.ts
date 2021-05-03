import {HydratedSpwItem, RawSpwItem} from './interfaces/internal';
import {SpwItemKind} from '../types/kind';
import {
    Component,
    HydratedShape,
    SerializationReducer,
    SpwItemJunction,
    SpwItemKey,
    SpwItemReductionConfig,
    SpwShape,
} from '@constructs/ast/abstract/types';

export interface ISpwItemStatic<K extends SpwItemKind = SpwItemKind> {
    readonly kind: K;
}

const defaultKeyFn = (s: SpwShape) => s?.key;

/**
 * Represents the most abstract item in a Spw syntax tree
 */
export abstract class SpwItem<K extends SpwItemKind = SpwItemKind,
    J extends SpwItemJunction = SpwItemJunction,
    H extends HydratedSpwItem = J extends SpwItemJunction<SpwShape, infer H> ? H : HydratedSpwItem,
    U extends RawSpwItem = J extends SpwItemJunction<SpwShape, HydratedShape, infer U> ? U : RawSpwItem> {
    readonly kind: K;
    protected readonly _hydrated: H | undefined;
    protected readonly _raw: U | null;
    constructor(raw?: U, hydrated?: H) {
        const constructor = <typeof SpwItem>this.constructor as unknown as ISpwItemStatic<K>;
        this.kind         = (raw?.kind ?? constructor.kind) as K;
        this._raw         = raw || null;
        this._hydrated    = hydrated;
    }
    get raw(): U | null {
        return this._raw;
    }
    get hydrated(): H | undefined {
        return this._hydrated;
    }

    get key(): SpwItemKey {
        type Type = SpwItemKey;
        type Context = typeof context;

        const context         = {};
        const subject         = this.hydrated ?? this.raw ?? null;
        const initialValue    = '';
        const start           = [initialValue, {}] as [Type, Context];
        const reductionConfig =
                  {
                      mutator:    defaultKeyFn,
                      normalizer: (component: Component<SpwShape, Type, Context>, value: Type[], context?: Context | null) =>
                                      component.normalize?.string
                                      ? component.normalize.string(value, context)
                                      : value[value.length - 1],
                      reducer:    (prev: SpwItemKey, curr: SpwItemKey) => [prev, curr].join(''),
                  };
        return (this.reduce<H | U, Type, Context>(subject, reductionConfig, start));
    }
    private get dummy(): Component<SpwShape[], string> {
        return {
            select() { return []; },
            generate:  function* (mut, body, ctxt) {
                for (const sub of body) yield mut(sub, ctxt) ?? null;
                yield ctxt ?? null;
            },
            normalize: {
                string: function ([...body]) {
                    return body.join(', ');
                },
            },
        }
    }
    getComponents(): Component[] {
        return [this.dummy];
    }
    reduce<T, Type, Context extends SpwShape = null, Intermediate extends Type[] = Type[]>(
        subject: T | null,
        {
            normalizer,
            mutator,
            reducer = null,
        }: SpwItemReductionConfig<Type, Context, Intermediate> = {mutator: defaultKeyFn},
        [initialValue, context]: [Type | null, Context]        = [null, null as Context],
    ): Type {
        const components = this.getComponents() as Component<SpwShape, Type, Context | null>[];
        if (!subject) throw new Error('Cannot get key of item')
        const start = [context, initialValue] as [Context, Type];

        function canNormalize(normalize: unknown): normalize is SerializationReducer<Type> {
            return typeof normalize === 'function';
        }
        return (
            components.reduce<[Context | null, Type]>(([context, prev], component) => {
                const {select, generate}   = component;
                let nextValue: Type | null = null;
                let nextContext: Context;
                let intermediate: Intermediate;
                {
                    const _collect  = [] as (Type | Context)[] as [...Intermediate, Context];
                    const component = select(subject);
                    for (const item of generate(mutator, component, context)) {
                        _collect.push(item as Type & Context);
                    }
                    nextContext  = ((_collect as [...Intermediate, Context]).pop() ?? null) as Context;
                    intermediate = _collect as unknown as Intermediate;
                }


                let normalized: Intermediate | Type;
                if (canNormalize(normalizer)) {
                    normalized = normalizer(component, intermediate, context) as Type;
                } else {
                    normalized = intermediate.pop() as Type | Context as Type;
                }

                nextValue =
                    (
                        reducer
                        ? reducer(prev, normalized)
                        : normalized
                    ) as Type;
                return [nextContext, nextValue];
            }, start) as [Context, Type]
        )[1]

    }
}