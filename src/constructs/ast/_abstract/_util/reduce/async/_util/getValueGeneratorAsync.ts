import { IConstructComponent } from "../../../../_types/IConstructComponent";
import { InteractionContext } from "@constructs/ast/_abstract/_types/interaction/context/interactionContext";

export default function getValueGeneratorAsync<Context extends InteractionContext>(
    component: IConstructComponent<Context>,
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