import { ComponentDescription } from "@constructs/ast/_abstract/_types/componentDescription";
import { InteractionContext } from "@constructs/ast/_abstract/_types/interaction/context/interactionContext";

export default function getValueGeneratorAsync<Context extends InteractionContext>(
    component: ComponentDescription<Context>,
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    subject: any,
    context: Context
): AsyncGenerator {
    return (
        component.asyncLocationGenerator?.(component.valueSelector(subject), context) ??
        (async function* () {
            yield;
        })()
    );
}