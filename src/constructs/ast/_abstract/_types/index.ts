/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentDescription } from "@constructs/ast/_abstract/_types/componentDescription";
import { InteractionContext } from "@constructs/ast/_abstract/_types/interaction/context/interactionContext";

export type ConstructComponentKey =
    string
    | null;

type ComponentKey =
    string
    | number
    | (string | number)[]
    | undefined;

export type ConstructReductionConfig<//
    Context extends InteractionContext = InteractionContext,
    // The expected return type
    ReductionOutput = any,
    // What's passed to the evaluator; the result of generating values
    ReductionValue extends any | null | undefined = any,
    // An item that might be returned from the generator after mutation
    InternalComponent extends any = any,
    > = {
    /**
     *
     * @param subject
     * @param key
     * @param context
     * @param isAsync
     */
    deriveSubject: (
        /**
         * This is a location
         * @see {ComponentDescription.generator}
         * @see {ComponentDescription.asyncGenerator}
         */
        location: any,
        key: ComponentKey,
        context: Context | null,
        isAsync: boolean
    ) => InternalComponent;
    /**
     *
     * @param componentDescription
     * @param intermediateReductionStep
     */
    normalizeStep: (
        componentDescription: ComponentDescription<Context>,
        intermediateReductionStep: [ReductionValue[], Context | null]
    ) => [ReductionOutput, Context];
    /**
     *
     * @param previous
     * @param current
     * @param isAsync
     */
    reduceStep: (
        previous: [ReductionOutput | any, Context | null],
        current: [ReductionOutput | null | undefined, Context | null],
        isAsync?: boolean | null
    ) => [ReductionOutput, Context | null];
};

/**
 *
 */
export type ConstructReductionOptions<Context extends InteractionContext = InteractionContext,
    // The expected return type
    ReductionOutput = any,
    // What's passed to the evaluator; the result of generating values
    Intermediate extends any | null | undefined = any,
    // An item that might be returned from the generator after mutation
    InternalComponent extends any = any,
    > = Partial<ConstructReductionConfig<Context, ReductionOutput, Intermediate, InternalComponent>>;
