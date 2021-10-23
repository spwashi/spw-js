import { InteractionContext } from "@constructs/ast/_abstract/_types/interaction/context/interactionContext";
import { ReductionLifecycleController } from "@constructs/ast/_abstract/_util/reduce/_util/lifecycle/types";


function combineValues(
    construct: { [k: string]: any } = {},
    [currKey, curr]: [any, any]
) {
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
}

export function runReductionEndLifecycleSync<Context extends InteractionContext = InteractionContext>(
    lifecycle: ReductionLifecycleController,
    lastStep: [any, Context]
): [any, Context] {
    const evalGenerator = lifecycle({ type: "end-reduction" })(lastStep);
    let end             = lastStep;
    for (let value, done; ({ value, done } = evalGenerator.next(end)), !done;) {
        if (value === undefined) continue;
        end = value;
    }

    const [values, context] = end;

    const joinedProperties =
              !Array.isArray(values)
              ? values
              : values.reduce(combineValues, {});

    return [joinedProperties, context];
}
