import { InteractionContext } from '@constructs/ast/_abstract/_types/interaction/context/interactionContext';
import { HydratedConstruct, RawConstruct } from '@constructs/ast/_abstract/_types/internal';
import { Construct } from '../../../construct';

function _entryReducer(
  construct: RawConstruct,
  [currKey, curr]: [string, any | any[]],
): RawConstruct {
  let next: any;
  const prev = construct[currKey];
  switch (currKey) {
    default:
      if (typeof prev === 'object' || currKey === 'items') {
        if (Array.isArray(prev)) {
          next = [...(prev as any[]), curr];
        } else {
          next = prev ? [prev, curr] : [curr];
        }
      } else {
        next = curr;
      }
      break;
  }
  return {
    ...construct,
    [currKey]: next,
  };
}

export type HydrationInput =
  | Partial<RawConstruct>
  | Partial<RawConstruct>[]
  | { [k: string]: RawConstruct };

export type AbsorbInput = Construct | HydratedConstruct;

export type AbsorbOutput = Construct | HydratedConstruct | null;

export interface HydrationContext extends InteractionContext {
  hydrate(node: HydrationInput, context: HydrationContext): Construct | null;

  absorb?(spwNode: AbsorbInput): AbsorbOutput;
}

export const joinHydratedProperties = (componentEntries: [string, any][]): HydratedConstruct => {
  !componentEntries.reduce && console.trace(componentEntries);
  return componentEntries.reduce(_entryReducer, {} as RawConstruct);
};
