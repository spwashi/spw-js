import { AsyncInteractionGenerator } from '@constructs/ast/_abstract/_types/interaction/async/asyncInteractionGenerator';
import { InteractionContext } from '@constructs/ast/_abstract/_types/interaction/context/interactionContext';
import { InteractionGenerator } from '@constructs/ast/_abstract/_types/interaction/sync/interactionGenerator';
import { RawConstruct } from '@constructs/ast/_abstract/_types/internal';

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
  toHydrated?: Hydrator<Output, Intermediate | RawConstruct[]>;

  stringify?: SerializationReducer<Intermediate, string>;

  toString?: SerializationReducer<undefined, string>;

  [k: string]:
    | SerializationReducer<Intermediate, Output | string>
    | SerializationReducer<undefined, string>
    | undefined;
};
/**
 *
 */
export type ComponentDescription<
  Context extends InteractionContext = InteractionContext,
  // an item of a Construct
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
  selector: (s: Owner) => Component | any;
  // Generator that produces elements of a component
  generator: InteractionGenerator<SubComponent | any, Context>;
  asyncGenerator: AsyncInteractionGenerator<SubComponent | any, Context> | null;
  // Object that contains instructions for how to evaluate a component
  evaluators: ComponentEvaluatorObject<SubComponent, SubComponentTupleOrList>;
  _fallback?: any;
};
