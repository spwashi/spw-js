/* eslint-disable @typescript-eslint/no-explicit-any */
import {HydratedSpwItem, RawSpwItem} from '@constructs/ast/_abstract/interfaces/internal';
import {SpwConstruct} from '@constructs/ast/_abstract/construct';

export type SpwItemKey =
    string
    | number
    | null;
/**
 * Something that might exist in the Spw universe (a value that a key in a SpwItem might correspond to)
 */
export type SpwShape =
    any
    | null;
/**
 * The shape of a SpwItem that has been hydrated
 */
export type HydratedShape =
    SpwShape
    & HydratedSpwItem;
/**
 * The shape of a SpwItem that has not been hydrated
 */
export type RawShape =
    SpwShape
    & RawSpwItem;

/**
 * Maintains references to analogous versions of this SpwItem
 */
export interface SpwItemJunction<T extends SpwShape = SpwShape,
    H extends HydratedShape = T & HydratedSpwItem,
    U extends RawShape = T & RawSpwItem> {
    Raw: U;
    Hydrated: H;
}

type Item =
    SpwConstruct
    | SpwShape;

type ComponentKey =
    string
    | number
    | (string | number)[]
    | undefined;

type Transform<T = Item, O = unknown, C = unknown> = (s: T, key?: ComponentKey, context ?: C) => O;

export type InteractionContext =
    {
        [s: string]: SpwShape
    }
    | SpwShape
    | null;
export type InteractionGenerator<//
    //
    Element extends Item = Item,
    //
    YieldOutput = SpwShape,
    //
    Context extends InteractionContext = InteractionContext,
    > =
    (
        item: SpwShape,
        key: ComponentKey,
        context: Context,
        mut: Transform<Element, YieldOutput, Context>,
    )
        => Generator<YieldOutput | Context | undefined, void, YieldOutput | Context | undefined>;

export type SerializationReducer<Intermediate, Output, SerializationContext extends InteractionContext | undefined = InteractionContext> =
    (s?: Intermediate, context?: SerializationContext | null) => Output;

export type Hydrator<//
    /**/ Output extends SpwShape = SpwShape,
    /**/ Intermediate = SpwShape[],
    /**/ Context extends InteractionContext = InteractionContext
    /**/> =
    SerializationReducer<//
        /**/
        /**/ Intermediate,
        /**/ Output,
        /**/ Context
        /**/
        /**/>;

export type ComponentEvaluatorObject<//
    //
    Output extends SpwShape = SpwShape,
    //
    Intermediate = Output[],
    //
    Context extends InteractionContext = InteractionContext
    //
    > = {
    hydrate?:
        Hydrator<Output, Intermediate | RawSpwItem[], Context>,

    stringify?:
        SerializationReducer<Intermediate, string, Context>,

    toString?:
        SerializationReducer<undefined, string, undefined>,

    [k: string]:
        SerializationReducer<Intermediate, Output | SpwConstruct | string, Context>
        | SerializationReducer<undefined, string, undefined>
        | undefined
};
/**
 *
 */
export type ComponentDescription<//
    // a portion of a SpwItem
    Component extends SpwShape = SpwShape,
    // subcomponents in order
    SubComponentTupleOrList extends SubComponent[] = SpwShape[],
    // context of interaction
    Context extends InteractionContext = InteractionContext,
    // item from which this component can be selected
    Owner extends SpwShape = SpwShape,
    // something that can be used to identify this component... todo
    ComponentSelector extends SpwShape = string,
    // component of a component
    SubComponent extends SpwShape = SpwShape> = {
    // Function or identifier for a component
    name: string;
    // Function or identifier for a component
    selector: ((s: Owner) => Component) | ComponentSelector;
    // Generator that produces elements of a component
    generator: InteractionGenerator<Component, SubComponent, Context>;
    // Object that contains instructions for how to evaluate a component
    evaluators?: ComponentEvaluatorObject<SubComponent, SubComponentTupleOrList, Context>,
    // catchall
    [k: string]: SpwShape
}

/**
 *
 */
export type SpwItemReductionConfig<//
    // The expected return type
    ReductionOutput,
    // The context of reduction
    Context extends InteractionContext = null,
    // What's passed to the evaluator; the result of generating values
    InternalComponentsTupleOrList extends InternalComponent[] = SpwShape[],
    // An item that might be returned from the generator after mutation
    InternalComponent extends SpwShape = SpwShape> = {
    // A function that maps a component to an internal representation
    mutator: (o: SpwShape, key?: ComponentKey, context?: Context) => InternalComponent,
    // Function that thg
    normalizer?: (
        c: ComponentDescription<SpwShape, any, Context>,
        intermediateValue: InternalComponentsTupleOrList,
        context: Context,
        nextContext: Context,
    ) => ReductionOutput,
    accumulator?: ((previous: ReductionOutput, current: ReductionOutput) => ReductionOutput) | null
};
