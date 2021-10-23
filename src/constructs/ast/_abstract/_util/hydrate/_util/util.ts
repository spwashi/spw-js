import { InteractionContext } from "@constructs/ast/_abstract/_types/interaction/context/interactionContext";
import { HydratedConstruct, RawConstruct } from "@constructs/ast/_abstract/_types/internal";
import { Construct } from "../../../construct";

export type HydrationInput =
    | Partial<RawConstruct>
    | Partial<RawConstruct>[]
    | { [k: string]: RawConstruct };

export type AbsorbInput =
    Construct
    | HydratedConstruct;

export type AbsorbOutput =
    Construct
    | HydratedConstruct
    | null;

export interface HydrationContext extends InteractionContext {
    hydrate(node: HydrationInput, context: HydrationContext): Construct | null;

    absorb?(spwNode: AbsorbInput): AbsorbOutput;
}
type Obj = { [k: string]: any };
type Step = [string, any | any[]];

export const joinHydratedProperties = (componentEntries: [string, any][]): Obj => {
    !componentEntries.reduce && console.trace(componentEntries);
    return componentEntries.reduce(function _entryReducer(construct: Obj, [currKey, curr]: Step): Obj {
                                       let next: any;
                                       const prev = construct[currKey];
                                       switch (currKey) {
                                           default:
                                               if (typeof prev === "object" || currKey === "items") {
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
                                           [currKey]: next
                                       };
                                   },
                                   {});
};
