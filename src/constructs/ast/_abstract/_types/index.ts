/* eslint-disable @typescript-eslint/no-explicit-any */
import { InteractionContext } from "@constructs/ast/_abstract/_types/interaction/context/interactionContext";
import { IConstructComponent } from "./IConstructComponent";

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
    deriveSubjectValue: (
        /**
         * This function gives us the 
         *
         * @see {IConstructComponent.generator}
         * @see {IConstructComponent.asyncGenerator}
         */
        step: [subject: any, context: Context | null],
        key: ComponentKey,
        isAsync: boolean
    ) => InternalComponent;
    /**
     *
     * @param componentDescription
     * @param intermediateReductionStep
     */
    normalizeStep: (
        componentDescription: IConstructComponent<Context>,
        denormalizedAggregateStep: [ReductionValue[], Context]
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
