import { InteractionContext } from "@constructs/ast/_abstract/_types/interaction/context/interactionContext";
import { ReductionLifecycleController } from "@constructs/ast/_abstract/_util/reduce/_util/lifecycle/types";

export function runReductionBeginLifecycleSync<StartType, Context extends InteractionContext>(
    lifecycle: ReductionLifecycleController,
    lastStep: [StartType | null, Context]
): [any, Context] {
    const evalGenerator = lifecycle({ type: "end-reduction" })(lastStep);
    let last            = lastStep;
    for (let value, done; ({ value, done } = evalGenerator.next(last)), !done;) {
        if (value === undefined) continue;
        last = value;
    }
    return last;
}
