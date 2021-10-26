import { AsyncSubjectGenerator } from "@constructs/ast/_abstract/_types/interaction/async/asyncSubjectGenerator";
import { InteractionContext } from "@constructs/ast/_abstract/_types/interaction/context/interactionContext";
import { ComponentSubjectGenerator } from "@constructs/ast/_abstract/_types/interaction/sync/componentSubjectGenerator";
import { ComponentSubjectEvaluatorObject, IConstructComponent } from "../_types/IConstructComponent";
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

/**
 * A Construct Component is something that composes a fragment of a construct.
 *
 * This is a Meta class for those components however they appear in the subject's deriving object
 *
 * ConstructMetaComponents are iterated over in the Reduction process,
 *  where they generate Subjects based on the Construct under Reduction
 *
 * The "value" of the resultant ConstructComponent might be
 *   - another Construct,
 *   - a Raw Value,
 *   - an array of Constructs or Raw Values.
 */
export class ConstructMetaComponent<Context extends InteractionContext = InteractionContext,
    Component extends any = any,
    SubComponentTupleOrList extends SubComponent[] = any[],
    Owner extends any = any,
    SubComponent extends any = any,
    > implements IConstructComponent<Context, Component, SubComponentTupleOrList, Owner, SubComponent> {
    subjectEvaluators = {};

    name = "";

    asyncSubjectGenerator: AsyncSubjectGenerator<any, Context> | null = null;

    constructor(config: ConstructComponentProps) {
        const selector   = makeSelector(config);
        const evaluators = makeEvaluators(config) as ComponentSubjectEvaluatorObject;

        // todo: I hate this
        Object.assign(
            this,
            {
                valueSelector: selector,
                ...config,
                subjectEvaluators: evaluators
            } as Partial<this>
        );
    }

    subjectGenerator: ComponentSubjectGenerator<any, Context> = function* (
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
