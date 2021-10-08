import { ConstructReductionConfig } from "@constructs/ast/_abstract/_types";
import { ComponentDescription } from "@constructs/ast/_abstract/_types/componentDescription";
import { InteractionContext } from "@constructs/ast/_abstract/_types/interaction/context/interactionContext";
import { ReductionLifecycleController } from "@constructs/ast/_abstract/_util/reduce/_util/lifecycle/types";
import { getComponentProcessor } from "@constructs/ast/_abstract/_util/reduce/async/_util/getComponentProcessor";
import { getInternalComponents } from "@constructs/ast/_abstract/component/_util/internal";

function getValueGenerator<Context extends InteractionContext>(
    component: ComponentDescription<Context>,
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
    Intermediate = any,
    >(
    reductionConfig: ConstructReductionConfig<Context>,
    lifecycle: ReductionLifecycleController,
    prototypes: Iterable<ComponentDescription<Context>>
): AsyncConstructReducer<Context, Subject, StartType, ReturnType> {
    type I_CD = Iterable<ComponentDescription<Context>>;

    const processComponent = getComponentProcessor(reductionConfig, lifecycle);
    const allPrototypes    =
              [
                  ...getInternalComponents(),
                  ...prototypes
              ] as I_CD;

    return async (
        seed: [StartType | null, Context | null],
        subject: Subject | null
    ): Promise<[ReturnType, Context]> => {
        const mut =
                  {
                      step: seed
                  } as {
                      step: [any, Context]
                  };

        // loop over each component
        for await (const component of allPrototypes) {
            const [, context] = mut.step;

            const [
                      intermediateComponentOutput,
                      nextContext
                  ] =
                      await processComponent({
                                                 component,
                                                 context,
                                                 valueGenerator:
                                                     getValueGenerator(
                                                         component,
                                                         subject,
                                                         context
                                                     )
                                             });

            const resolved =
                      [
                          await Promise.all(intermediateComponentOutput),
                          nextContext
                      ] as [Intermediate[], Context];

            const normalized = reductionConfig.normalizeStep(component, resolved);

            const reduced = await reductionConfig.reduceStep(mut.step, normalized, true);

            mut.step = reduced as [ReturnType, Context];
        }

        return mut.step;
    };
}
