/* eslint-disable @typescript-eslint/no-explicit-any */
import {HydratedSpwItem, RawSpwItem} from '@constructs/ast/_abstract/interfaces/internal';
import {SpwItem} from '@constructs/ast/_abstract/item';

export type SpwItemKey = string | number | null;
/**
 * Something that might exist in the Spw universe (a value that a key in a SpwItem might correspond to)
 */
export type SpwShape = any;
/**
 * The shape of a SpwItem that has been hydrated
 */
export type HydratedShape = SpwShape & HydratedSpwItem;
/**
 * The shape of a SpwItem that has not been hydrated
 */
export type RawShape = SpwShape & RawSpwItem;

/**
 * Maintains references to analogous versions of this SpwItem
 */
export interface SpwItemJunction<T extends SpwShape = SpwShape,
    H extends HydratedShape = T & HydratedSpwItem,
    U extends RawShape = T & RawSpwItem> {
    Raw: U;
    Hydrated: H;
}

type Item = SpwItem | SpwShape;
type Transform<T = Item, O = unknown, C = unknown> = (s: T, context ?: C) => O;
export type InteractionGenerator<T extends Item = Item, Output = SpwShape, InteractionContext extends SpwShape | undefined = null> =
    (
        mut: Transform<T, Output, InteractionContext>,
        item: SpwShape,
        context?: InteractionContext | null,
    ) => Generator<Output | InteractionContext | undefined>;
export type SerializationReducer<Output, SerializationContext extends SpwShape = null> = (s: Iterable<Output>, context?: SerializationContext | null | undefined) => Output;
export type Component<T extends SpwShape = SpwShape,
    Output = SpwShape,
    InteractionContext extends SpwShape | undefined = null> = {
    select: (s: SpwShape) => T;
    generate: InteractionGenerator<T, Output, InteractionContext>;
    normalize?: {
        [k: string]: SerializationReducer<Output, InteractionContext>
    }
}
export type SpwItemReductionConfig<Type, Context extends any = null, Intermediate extends Type[] = Type[]> = {
    mutator: (o: SpwShape) => Type,
    normalizer?: (c: Component<SpwShape, Type, Context | any>, v: Intermediate, ctxt?: Context | null) => Type,
    reducer?: ((previous: Type, current: Type) => Type) | null
};