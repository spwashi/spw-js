import { IConstructComponent, ComponentSubjectEvaluatorObject } from "../_types/IConstructComponent";
import { AsyncLocationGenerator } from "@constructs/ast/_abstract/_types/interaction/async/asyncLocationGenerator";
import { InteractionContext } from "@constructs/ast/_abstract/_types/interaction/context/interactionContext";
import { ComponentLocationGenerator } from "@constructs/ast/_abstract/_types/interaction/sync/componentLocationGenerator";
import { RawConstruct } from "../_types/internal";

const defaultEvaluator = {
    toHydrated: function(items: RawConstruct[] | undefined) {
        return items;
    },
    stringify:  function(items) {
        return Array.from(items ?? [])
                    .filter(Boolean)
                    .filter(Boolean)
                    .join("");
    }
} as ComponentSubjectEvaluatorObject;

function makeSelector(
    override: Partial<IConstructComponent<any, any[], any, any>> & {
        name: string;
    }
) {
    return function(s: any) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const componentName = <string | undefined>override.name;
        if (!componentName) return null;
        return s?.[componentName as string] ?? null;
    };
}
function makeEvaluators(
    override: Partial<IConstructComponent<any, any[], any, any>> & {
        name: string;
    }
) {
    return { ...defaultEvaluator, ...(override.subjectEvaluators ?? {}) };
}

export type ConstructComponentProps =
    Partial<IConstructComponent>
    & {
        name: string;
    };

export class ConstructComponent<Context extends InteractionContext = InteractionContext,
    Component extends any = any,
    SubComponentTupleOrList extends SubComponent[] = any[],
    Owner extends any = any,
    SubComponent extends any = any,
    > implements IConstructComponent<Context, Component, SubComponentTupleOrList, Owner, SubComponent> {
    subjectEvaluators = {};

    name = "";

    asyncLocationGenerator: AsyncLocationGenerator<any, Context> | null = null;

    constructor(config: ConstructComponentProps) {
        const selector   = makeSelector(config);
        const evaluators = makeEvaluators(config) as ComponentSubjectEvaluatorObject;

        Object.assign(this,
                      {
                          valueSelector: selector,
                          ...config,
                          subjectEvaluators: evaluators
                      } as Partial<this>);
    }

    locationGenerator: ComponentLocationGenerator<any, Context> = function* (
        component: SubComponent,
        ctxt: Context | null
    ) {
        if (
            typeof component === "object" &&
            component &&
            typeof (component as any)[Symbol.iterator] === "function"
        ) {
            for (const sub of component as Iterable<any>) {
                if (component == void 0) continue;
                yield [sub, ctxt] as [any, Context];
            }
        } else if (component) {
            yield [component, ctxt] as [any, Context];
        }

        return null;
    };

    valueSelector = (): null => null;
}
