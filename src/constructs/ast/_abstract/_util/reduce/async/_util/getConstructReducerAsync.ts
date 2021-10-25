import { ConstructReductionConfig } from "@constructs/ast/_abstract/_types";
import { IConstructComponent } from "../../../../_types/IConstructComponent";
import { InteractionContext } from "@constructs/ast/_abstract/_types/interaction/context/interactionContext";
import { ReductionLifecycleController } from "@constructs/ast/_abstract/_util/reduce/_util/lifecycle/types";
import { getValueGenerationProcessorAsync } from "@constructs/ast/_abstract/_util/reduce/async/_util/getValueGenerationProcessorAsync";
import { getInternalComponents } from "@constructs/ast/_abstract/component/_util/internal";

interface AsyncConstructReducer<Context extends InteractionContext = InteractionContext,
    Subject = any,
    StartType = any,
    ReturnType = any,
    > {
    (seed: [StartType | null, Context | null], subject: Subject | null): Promise<[ReturnType, Context]>;
}

export function getConstructReducerAsync<Context extends InteractionContext = InteractionContext,
    Subject = any,
    StartType = any,
    ReturnType = any,
    >(
    reductionConfig: ConstructReductionConfig<Context>,
    lifecycle: ReductionLifecycleController, prototypes: Iterable<IConstructComponent<Context>>): AsyncConstructReducer<Context, Subject, StartType, ReturnType> {
    type I_CD = Iterable<IConstructComponent<Context>>;

    const allPrototypes    = [...getInternalComponents(), ...prototypes] as I_CD;
    const processComponent = getValueGenerationProcessorAsync(reductionConfig, lifecycle);

    const all = (input: any[]) => Promise.all(input);
    return async (
        seed: [StartType | null, Context | null],
        subject: Subject | null
    ): Promise<[ReturnType, Context]> => {
        const mut = { step: seed } as { step: [any, Context] };

        // loop over each component
        for await (const component of allPrototypes) {
            const [, context] = mut.step;

            const [
                      intermediate,
                      nextContext
                  ] =
                      await processComponent({
                                                 component,
                                                 context,
                                                 subject
                                             });

            const normalized = reductionConfig.normalizeStep(component,
                                                             [
                                                                 await all(intermediate),
                                                                 nextContext
                                                             ]);
            const reduced    = await reductionConfig.reduceStep(mut.step, normalized, true);

            mut.step = reduced as [ReturnType, Context];
        }

        return mut.step;
    };
}
