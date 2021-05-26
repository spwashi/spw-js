/* eslint-disable @typescript-eslint/no-explicit-any */
import {RawSpwConstruct} from '@constructs/ast/_abstract/_types/internal';
import {SpwConstruct} from '@constructs/ast/_abstract/spwConstruct';

export type SpwItemKey =
    string
    | null;

type ComponentKey =
    string
    | number
    | (string | number)[]
    | undefined;


export type InteractionContext =
    {
        enter?: () => InteractionContext,
        exit?: () => void,
        [s: string]: any
    };
export type InteractionGenerator<YieldOutput = any> =
    (
        item: any,
        context: InteractionContext | null | undefined,
    )
        => Generator<//
        /**/  [YieldOutput, InteractionContext | null | undefined],
        /**/  InteractionContext | undefined | void
        /**/>;

type AsyncInteractionGenerator<//
    //
    YieldOutput = any,
    > =
    (
        item: any,
        context: InteractionContext | null,
    )
        => AsyncGenerator<[YieldOutput | undefined, InteractionContext | null], InteractionContext | void, YieldOutput | undefined>;

type SerializationReducer<Intermediate, Output, SerializationContext extends InteractionContext = InteractionContext> =
    (s?: Intermediate, context?: SerializationContext | null) => Output;

type Hydrator<//
    /**/ Output extends any = any,
    /**/ Intermediate = any[],
    /**/> =
    SerializationReducer<//
        /**/
        /**/ Intermediate,
        /**/ Output
        /**/
        /**/>;

export type ComponentEvaluatorObject<//
    //
    Output extends any = any,
    //
    Intermediate = Output[],
    //
    > = {
    hydrate?:
        Hydrator<Output, Intermediate | RawSpwConstruct[]>,

    stringify?:
        SerializationReducer<Intermediate, string>,

    toString?:
        SerializationReducer<undefined, string>,

    [k: string]:
        SerializationReducer<Intermediate, Output | SpwConstruct | string>
        | SerializationReducer<undefined, string>
        | undefined
};
/**
 *
 */
export type ComponentDescription<//
    // a portion of a SpwItem
    Component extends any = any,
    // subcomponents in order
    SubComponentTupleOrList extends SubComponent[] = any[],
    // item from which this component can be selected
    Owner extends any = any,
    // component of a component
    SubComponent extends any = any> = {
    // Function or identifier for a component
    name: string;
    // Function or identifier for a component
    selector: ((s: Owner) => Component);
    // Generator that produces elements of a component
    generator: InteractionGenerator<SubComponent>;
    asyncGenerator?: AsyncInteractionGenerator<SubComponent>;
    // Object that contains instructions for how to evaluate a component
    evaluators: ComponentEvaluatorObject<SubComponent, SubComponentTupleOrList>,
    // catchall
    [k: string]: any
}

export type ConstructReductionConfig<//
    // The expected return type
    ReductionOutput = any,
    // What's passed to the evaluator; the result of generating values
    Intermediate extends any | null | undefined = any,
    // An item that might be returned from the generator after mutation
    InternalComponent extends any = any> = {
    /**
     *
     * @param o
     * @param key
     * @param context
     * @param isAsync
     */
    evaluator: (o: any, key: ComponentKey, context: InteractionContext | null, isAsync: boolean) => InternalComponent,
    /**
     *
     * @param c
     * @param intermediateValue
     * @param context
     */
    stepNormalizer: (
        componentDescription: ComponentDescription<any>,
        [intermediateValue, context]: [Intermediate[], InteractionContext | null],
    ) => [ReductionOutput, InteractionContext],
    /**
     *
     * @param previous
     * @param current
     * @param isAsync
     */
    reducer:
        (
            previous: [ReductionOutput | any, InteractionContext | null],
            current: [ReductionOutput | null | undefined, InteractionContext | null],
            isAsync?: boolean | null,
        ) => [ReductionOutput, InteractionContext | null]
};


/**
 *
 */
export type ConstructReductionOptions<//
    // The expected return type
    ReductionOutput = any,
    // What's passed to the evaluator; the result of generating values
    Intermediate extends any | null | undefined = any,
    // An item that might be returned from the generator after mutation
    InternalComponent extends any = any> =
    Partial<ConstructReductionConfig<ReductionOutput, Intermediate, InternalComponent>>