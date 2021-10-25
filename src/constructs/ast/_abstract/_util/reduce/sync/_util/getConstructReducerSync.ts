import { ConstructReductionConfig } from "@constructs/ast/_abstract/_types";
import { IConstructComponent } from "../../../../_types/IConstructComponent";
import { InteractionContext } from "@constructs/ast/_abstract/_types/interaction/context/interactionContext";
import { ReductionLifecycleController } from "@constructs/ast/_abstract/_util/reduce/_util/lifecycle/types";
import getValueGenerationProcessorSync from "@constructs/ast/_abstract/_util/reduce/sync/_util/getValueGenerationProcessorSync";
import { getInternalComponents } from "@constructs/ast/_abstract/component/_util/internal";

interface ConstructReducerSync<Context extends InteractionContext = InteractionContext,
    Subject = any,
    StartType = any | null,
    ReturnType = any,
    > {
    (seed: [StartType | null, Context | null], subject: Subject | null): [ReturnType, Context];
}

export function getConstructReducerSync<Context extends InteractionContext = InteractionContext,
    Subject = any,
    StartType = any | null,
    ReturnType = any,
    >(
    reductionConfig: ConstructReductionConfig<Context>,
    lifecycle: ReductionLifecycleController,
    prototypes: Iterable<IConstructComponent<Context>>
): ConstructReducerSync<Context, Subject, StartType, ReturnType> {
    type I_CD = Iterable<IConstructComponent<Context>>;

    const allPrototypes    = [...getInternalComponents(), ...prototypes] as I_CD;
    const processComponent = getValueGenerationProcessorSync(reductionConfig, lifecycle);

    return (
        seed: [StartType | null, Context | null],
        subject: Subject | null
    ): [ReturnType, Context] => {
        const mut = { step: seed } as { step: [any, Context | any] };


        // loop over each component
        for (const component of allPrototypes) {
            const [, context] = mut.step;
            const normalized  =
                      reductionConfig.normalizeStep(
                          component,
                          processComponent({
                                               component,
                                               context,
                                               subject
                                           })
                      );

            mut.step = reductionConfig.reduceStep(mut.step, normalized, false);
        }
        return mut.step as [ReturnType, Context];
    };
}
