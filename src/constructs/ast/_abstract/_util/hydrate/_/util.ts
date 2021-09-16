import { InteractionContext } from '@constructs/ast/_abstract/_types';
import { HydratedConstruct, RawConstruct } from '@constructs/ast/_abstract/_types/internal';
import { Construct } from '../../../construct';

function _entryReducer(t: RawConstruct, [currKey, curr]: [string, any | any[]]): RawConstruct {
  const isArray = Array.isArray(t[currKey]);
  return {
    ...t,
    [currKey]:
      typeof t[currKey] === 'undefined'
        ? curr
        : // it already exists
        typeof t[currKey] === 'object'
        ? isArray
          ? [...(t[currKey] as any[]), curr]
          : [t[currKey], curr]
        : curr,
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
