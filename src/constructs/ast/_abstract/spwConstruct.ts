import {ConstructKind} from '../_types/kind';
import {ComponentDescription, ComponentEvaluatorObject, ConstructReductionOptions, InteractionContext, SpwItemKey} from '@constructs/ast/_abstract/_types';
import {completeConfig, reduceConstruct, reduceConstructAsync} from '@constructs/ast/_abstract/_util/reduction';
import {LanguageComponent} from '@constructs/ast/_abstract/component';

export interface ISpwConstructStatic<K extends ConstructKind = ConstructKind> {
    readonly kind: K;
}

type ConstructInitializer = any;

export type ConstructComponents =
    Iterable<ComponentDescription>
    & {
        [k: string]: ComponentDescription | any
    };


type KeyReductionSeed = [string, InteractionContext];

/**
 * Represents the most abstract item in a Spw syntax tree
 */
export class SpwConstruct<K extends ConstructKind = ConstructKind, U extends ConstructInitializer = ConstructInitializer> {
    static readonly kind: ConstructKind = 'unknown';

    static components: ConstructComponents | null =
               null;

    readonly kind: K =
                 'unknown' as K;

    protected readonly _internal: U | null;

    constructor(internal?: U) {
        const constructor = <typeof SpwConstruct>this.constructor as unknown as typeof SpwConstruct;
        this.kind         = constructor.kind as K;
        this._internal    = internal || null;

        Object.assign(this, this._internal);
    }

    get internal(): U | null {
        return this._internal;
    }

    get key(): SpwItemKey {
        type Output = SpwItemKey;
        type Context = typeof context;
        type Prototype = ComponentDescription;
        type Seed = KeyReductionSeed;
        const context    = {};
        const Ctor       = this.constructor as typeof SpwConstruct;
        const seed: Seed = ['', {}];


        const reduced =
                  Ctor.reduce(this.internal ?? null,
                              {
                                  evaluator(subject) {
                                      if (typeof subject === 'string' && subject || typeof subject === 'number') {
                                          return subject;
                                      }

                                      return subject?.key;
                                  },

                                  stepNormalizer(prototype: Prototype, [intermediate, context]) {
                                      const evaluator = prototype.evaluators.stringify as ComponentEvaluatorObject['stringify'];
                                      const evaluated = evaluator
                                                        ? evaluator(intermediate, context)
                                                        : intermediate ? intermediate[intermediate.length - 1]
                                                                       : null;
                                      return [evaluated, context] as [Output, Context];
                                  },

                                  reducer([prev], [curr, next]) {
                                      return [[prev, curr].join(''), next] as [SpwItemKey, InteractionContext];
                                  },
                              },
                              seed,
                  );

        return reduced[0];
    }

    static isSpwConstruct(node: SpwConstruct | any): node is SpwConstruct {
        return !!node?.kind;
    }

    /**
     * Reduce a construct
     *
     * convert a construct into a different representation using some sort of state-dependent mutator.
     *
     * @param subject
     * @param options
     * @param seed
     */
    static reduce<ReturnType = any, Intermediate extends any = ReturnType, StartType = any, Subject = any, ReductionContext extends InteractionContext = InteractionContext, _Options extends ConstructReductionOptions<ReturnType, Intermediate> | undefined = ConstructReductionOptions<ReturnType, Intermediate>, _Output extends [ReturnType, ReductionContext] = [ReturnType, ReductionContext]>(
        subject: Subject | null                            = null,
        options: _Options | null                           = null,
        seed: [StartType, ReductionContext] | [null, null] = [null, null],
    ): _Output {
        return reduceConstruct(subject,
                               completeConfig(options ?? {}),
                               seed,
                               this.components ?? [],
        ) as _Output;
    }

    /**
     * Reduce a construct asynchronously
     *
     * {@see SpwConstruct.reduce}
     *
     * @param subject
     * @param options
     * @param seed
     */
    static async reduceAsync<ReturnType = any, Intermediate extends any = ReturnType, StartType = any, Subject = any, ReductionContext extends InteractionContext = InteractionContext, _Options extends ConstructReductionOptions<ReturnType, Intermediate> | undefined = ConstructReductionOptions<ReturnType, Intermediate>, _Output extends [ReturnType, ReductionContext] = [ReturnType, ReductionContext]>(
        subject: Subject | null                            = null,
        options: _Options | null                           = null,
        seed: [StartType, ReductionContext] | [null, null] = [null, null],
    ): Promise<_Output> {
        return reduceConstructAsync(subject,
                                    completeConfig(options ?? {}),
                                    seed,
                                    this.components ?? []) as Promise<_Output>;
    }

    /**
     * create a SpwConstruct component
     * @param override
     * @protected
     */
    protected static makeComponent(override: { name: string, [k: string]: any } & Partial<ComponentDescription>): ComponentDescription {
        return new LanguageComponent(override);
    }
}