/* eslint-disable @typescript-eslint/no-explicit-any */
import { RawSpwConstruct } from '@constructs/ast/_abstract/_types/internal';
import { Construct } from '../construct';

export type SpwItemKey = string | null;

type ComponentKey = string | number | (string | number)[] | undefined;

export type InteractionContext = {
  enter<T extends Partial<InteractionContext> = Partial<InteractionContext>>(
    arg?: T,
  ): InteractionContext & T;
  exit(): InteractionContext | void;
};

// todo move this
export const PlainInteractionContext = (): InteractionContext => ({
  enter<T extends Partial<InteractionContext>>(
    item?: T,
  ): InteractionContext & T {
    const parent = (this || PlainInteractionContext()) as InteractionContext;
    return {
      ...parent,
      ...(item || {}),
      parent,
    } as InteractionContext & T & { parent: InteractionContext };
  },
  exit(): InteractionContext | void {
    return this;
  },
});

export type InteractionGenerator<
  YieldOutput = any,
  Context extends InteractionContext = InteractionContext,
> = (
  item: any,
  context: Context | null,
) => Generator<
  //
  /**/ [YieldOutput, Context | null],
  /**/ Context | null
  /**/
>;

type AsyncInteractionGenerator<
  //
  //
  YieldOutput = any,
  Context extends InteractionContext = InteractionContext,
> = (
  item: any,
  context: Context | null,
) => AsyncGenerator<
  [YieldOutput | undefined, Context | null],
  Context | null,
  YieldOutput | undefined
>;

type SerializationReducer<
  Intermediate,
  Output,
  SerializationContext extends InteractionContext = InteractionContext,
> = (s?: Intermediate, context?: SerializationContext | null) => Output;

type Hydrator<
  //
  /**/ Output extends any = any,
  /**/ Intermediate = any[],
  /**/
> = SerializationReducer<
  //
  /**/
  /**/ Intermediate,
  /**/ Output
  /**/
  /**/
>;

export type ComponentEvaluatorObject<
  //
  //
  Output extends any = any,
  //
  Intermediate = Output[],
  //
> = {
  hydrate?: Hydrator<Output, Intermediate | RawSpwConstruct[]>;

  stringify?: SerializationReducer<Intermediate, string>;

  toString?: SerializationReducer<undefined, string>;

  [k: string]:
    | SerializationReducer<Intermediate, Output | Construct | string>
    | SerializationReducer<undefined, string>
    | undefined;
};
/**
 *
 */
export type ComponentDescription<
  Context extends InteractionContext = InteractionContext,
  // a portion of a SpwItem
  Component extends any = any,
  // subcomponents in order
  SubComponentTupleOrList extends SubComponent[] = any[],
  // item from which this component can be selected
  Owner extends any = any,
  // component of a component
  SubComponent extends any = any,
> = {
  // Function or identifier for a component
  name: string;
  // Function or identifier for a component
  selector: (s: Owner) => Component;
  // Generator that produces elements of a component
  generator: InteractionGenerator<SubComponent, Context>;
  asyncGenerator?: AsyncInteractionGenerator<SubComponent, Context>;
  // Object that contains instructions for how to evaluate a component
  evaluators: ComponentEvaluatorObject<SubComponent, SubComponentTupleOrList>;
  // catchall
  [k: string]: any;
};

export type ConstructReductionConfig<
  //
  Context extends InteractionContext = InteractionContext,
  // The expected return type
  ReductionOutput = any,
  // What's passed to the evaluator; the result of generating values
  Intermediate extends any | null | undefined = any,
  // An item that might be returned from the generator after mutation
  InternalComponent extends any = any,
> = {
  /**
   *
   * @param o
   * @param key
   * @param context
   * @param isAsync
   */
  evaluator: (
    o: any,
    key: ComponentKey,
    context: Context | null,
    isAsync: boolean,
  ) => InternalComponent;
  /**
   *
   * @param c
   * @param intermediateValue
   * @param context
   */
  stepNormalizer: (
    componentDescription: ComponentDescription<Context>,
    [intermediateValue, context]: [Intermediate[], Context | null],
  ) => [ReductionOutput, Context];
  /**
   *
   * @param previous
   * @param current
   * @param isAsync
   */
  reducer: (
    previous: [ReductionOutput | any, Context | null],
    current: [ReductionOutput | null | undefined, Context | null],
    isAsync?: boolean | null,
  ) => [ReductionOutput, Context | null];
};

/**
 *
 */
export type ConstructReductionOptions<
  Context extends InteractionContext = InteractionContext,
  // The expected return type
  ReductionOutput = any,
  // What's passed to the evaluator; the result of generating values
  Intermediate extends any | null | undefined = any,
  // An item that might be returned from the generator after mutation
  InternalComponent extends any = any,
> = Partial<
  ConstructReductionConfig<
    Context,
    ReductionOutput,
    Intermediate,
    InternalComponent
  >
>;
