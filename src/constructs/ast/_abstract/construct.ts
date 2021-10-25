import { ConstructComponentKey, ConstructReductionOptions } from "@constructs/ast/_abstract/_types";
import { initInteractionContext } from "@constructs/ast/_abstract/_types/interaction/context/initInteractionContext";
import { InteractionContext } from "@constructs/ast/_abstract/_types/interaction/context/interactionContext";
import { fillReductionConfig } from "@constructs/ast/_abstract/_util/reduce/_util/config/completeConfig";
import { reduceConstructAsync } from "@constructs/ast/_abstract/_util/reduce/async/reduceConstructAsync";
import { reduceConstructSync } from "@constructs/ast/_abstract/_util/reduce/sync/reduceConstructSync";
import { ConstructKind } from "../../top/kinds";
import { ComponentSubjectEvaluatorObject, IConstructComponent } from "./_types/IConstructComponent";

export interface IConstructClass<K extends ConstructKind = ConstructKind> {
    readonly kind: K;
}

type ConstructInitializer = any;

export type ConstructComponents =
    Iterable<IConstructComponent>
    & {
        [k: string]: IConstructComponent | any;
    };

type KeyReductionSeed = [string, InteractionContext];

/**
 * Represents the most abstract item in a Spw syntax tree
 */
export class Construct<K extends ConstructKind = ConstructKind,
    U extends ConstructInitializer = ConstructInitializer,
    > {
    static readonly kind: ConstructKind = "unknown";

    static components: ConstructComponents = [];

    readonly kind: K = "unknown" as K;

    readonly #internal: U | null;

    constructor(internal?: U) {
        const constructor = (<typeof Construct>this.constructor) as unknown as typeof Construct;
        this.kind         = constructor.kind as K;
        this.#internal    = internal || null;
    }

    get internal(): U | null {
        return this.#internal;
    }

    get key(): ConstructComponentKey {
        type Output = ConstructComponentKey;
        type Context = typeof context;
        type Prototype = IConstructComponent;
        type Seed = KeyReductionSeed;

        const context    = initInteractionContext({ kind: "keyingContext" });
        const seed: Seed = ["", context];
        const components = (<typeof Construct>this.constructor).components ?? [];

        const config =
                  fillReductionConfig(
                      {
                          deriveSubjectValue([item]) {
                              if ((typeof item === "string" && item) || typeof item === "number") {
                                  return item;
                              }
                              return item?.key;
                          },

                          normalizeStep(prototype: Prototype, [intermediate, context]) {
                              const evaluator = prototype.subjectEvaluators.stringify as ComponentSubjectEvaluatorObject["stringify"];
                              let evaluated: string | null;
                              if (evaluator) {
                                  evaluated = evaluator(intermediate, context);
                              } else {
                                  evaluated = intermediate ? intermediate[intermediate.length - 1] : null;
                              }
                              return [
                                  evaluated, context
                              ] as [Output, Context];
                          },

                          reduceStep([prev], [curr, next]) {
                              return [
                                  [prev, curr].join(""), next
                              ] as [ConstructComponentKey, InteractionContext];
                          }
                      }
                  );

        const subject = this.internal ?? null;
        const reduced = reduceConstructSync(subject, config, seed, components);

        return reduced[0];
    }

    static isConstruct(node: Construct | any): node is Construct {
        return !!node?.kind;
    }


    /**
     * Reduce a construct asynchronously
     *
     * {@see Construct.reduce}
     *
     * @param subject
     * @param options
     * @param seed
     */
    static async reduceAsync<//
        ReductionContext extends InteractionContext = InteractionContext,
        ReturnType = any,
        Intermediate extends any = ReturnType,
        StartType = any | null,
        Subject = any,
        _Output extends [ReturnType, ReductionContext] = [ReturnType, ReductionContext],
        >(
        subject: Subject | null                                                               = null,
        options: ConstructReductionOptions<ReductionContext, ReturnType, Intermediate> | null = null,
        seed: [StartType, ReductionContext | null] | [null, null]                             = [null, null]
    ): Promise<_Output> {
        return reduceConstructAsync<ReductionContext>(
            subject,
            fillReductionConfig<ReductionContext>(options ?? {}),
            seed,
            (this.components ?? []) as IConstructComponent<ReductionContext>[]
        ) as Promise<_Output>;
    }

    public toJSON(): U {
        return {
            kind: this.kind,
            key:  this.key,
            ...Object(this.internal)
        };
    }
}
