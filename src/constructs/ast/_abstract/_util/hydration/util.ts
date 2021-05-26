import {HydratedSpwItem, RawSpwConstruct} from '@constructs/ast/_abstract/_types/internal';
import {InteractionContext} from '@constructs/ast/_abstract/_types';
import {SpwConstruct} from '@constructs/ast/_abstract/spwConstruct';

export function _entryReducer(t: RawSpwConstruct, [currKey, curr]: [string, any | any[]]): RawSpwConstruct {
    const isArray = Array.isArray(t[currKey]);
    return ({
        ...t,
        [currKey]:
            typeof t[currKey] === 'undefined'
            ? curr
            : (
                // it already exists
                typeof t[currKey] === 'object' ? (
                                                   isArray
                                                   ? (
                                                       [
                                                           ...t[currKey] as any[],
                                                           curr,
                                                       ]
                                                   )
                                                   : (
                                                       [
                                                           t[currKey],
                                                           curr,
                                                       ]

                                                   ))
                                               : curr
            ),
    });
}

export type HydrationInput =
    Partial<RawSpwConstruct>
    | Partial<RawSpwConstruct>[]
    | { [k: string]: RawSpwConstruct };

export interface HydrationContext extends InteractionContext {
    location?: { [k: string]: any };

    hydrate?(node: HydrationInput, context: HydrationContext):
        SpwConstruct | null;


    absorb?(spwNode: SpwConstruct | HydratedSpwItem):
        SpwConstruct | HydratedSpwItem | null;

    [s: string]: any
}

export const joinHydratedProperties =
                 (componentEntries: [string, any][]): HydratedSpwItem => componentEntries.reduce(_entryReducer, {} as RawSpwConstruct)