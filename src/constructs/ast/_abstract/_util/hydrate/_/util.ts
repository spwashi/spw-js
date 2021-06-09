import {
  HydratedSpwItem,
  RawSpwConstruct,
} from '@constructs/ast/_abstract/_types/internal';
import { InteractionContext } from '@constructs/ast/_abstract/_types';
import { Construct } from '../../../construct';

export function _entryReducer(
  t: RawSpwConstruct,
  [currKey, curr]: [string, any | any[]],
): RawSpwConstruct {
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
  | Partial<RawSpwConstruct>
  | Partial<RawSpwConstruct>[]
  | { [k: string]: RawSpwConstruct };

export type AbsorbInput = Construct | HydratedSpwItem;

export type AbsorbOutput = Construct | HydratedSpwItem | null;

export interface HydrationContext extends InteractionContext {
  hydrate(node: HydrationInput, context: HydrationContext): Construct | null;

  absorb?(spwNode: AbsorbInput): AbsorbOutput;
}

export const joinHydratedProperties = (
  componentEntries: [string, any][],
): HydratedSpwItem =>
  componentEntries.reduce(_entryReducer, {} as RawSpwConstruct);
