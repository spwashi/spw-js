import {RawSpwItem} from './interfaces/internal';
import {SpwItemKind} from '../_types/kind';
import {ComponentEvaluator, ComponentPrototype, Hydrator, InteractionContext, SpwItemKey, SpwItemReductionConfig, SpwShape} from '@constructs/ast/_abstract/types';
import {HydrationContext} from '@constructs/ast/_util/hydrate';
import {getDefaultComponentPrototype} from '@constructs/ast/_abstract/_helpers/getDefaultComponentPrototype';

export interface ISpwItemStatic<K extends SpwItemKind = SpwItemKind> {
    readonly kind: K;
}

const getKeyFromItem =
          (s: SpwShape) => {
              if (typeof s === 'string' && s || typeof s === 'number') {
                  return s;
              } else {
                  return s?.key;
              }
          };

type ReductionStep<Type, Context extends SpwShape = null> = [Type | null, Context];
type SpwItemInitializer = SpwShape;

/**
 * Represents the most abstract item in a Spw syntax tree
 */
export class SpwItem</**/
    /**/ K extends SpwItemKind = SpwItemKind,
    /**/ U extends SpwItemInitializer = SpwItemInitializer
    /**/> {

    static readonly kind: SpwItemKind = 'unknown';

    readonly kind: K = 'unknown' as K;

    protected readonly _internal: U | null;

    constructor(internal?: U) {
        const constructor = <typeof SpwItem>this.constructor as unknown as ISpwItemStatic<K>;
        this.kind         = constructor.kind as K;
        this._internal    = internal || null;
    }

    get internal(): U | null {
        return this._internal;
    }

    get key(): SpwItemKey {
        type Output = SpwItemKey;
        type Context = typeof context;
        type Prototype = ComponentPrototype;

        const evaluationScheme: keyof ComponentEvaluator = 'stringify';

        const context      = {};
        const subject      = this.internal ?? null;
        const initialValue = '';

        const mutator         = getKeyFromItem;
        const accumulator     = (prev: SpwItemKey, curr: SpwItemKey) => {
            return [prev, curr].join('');
        };
        const normalizer      = function (prototype: Prototype, intermediate: Output[], context: Context) {
            const evaluator = prototype.evaluator?.[evaluationScheme] as ComponentEvaluator['stringify'];
            return evaluator ? evaluator(intermediate, context)
                             : intermediate[intermediate.length - 1];
        };
        const reductionConfig = {mutator, normalizer, accumulator} as SpwItemReductionConfig<Output, Context>;

        const Ctor = this.constructor as typeof SpwItem;
        return (
            Ctor.reduce<U, string, Output, Context>(
                [initialValue, {}],
                subject,
                reductionConfig,
            )
        );
    }

    static getComponentPrototypes(): ComponentPrototype[] {
        return [
            {
                ...SpwItem._genericComponent(),
                componentName: 'unknown',
            },
        ];
    }

    static reduce</**/
        /**/ Subject,
        /**/ StartType = null,
        /**/ ReturnType = StartType,
        /**/ ReductionContext extends InteractionContext = null,
        /**/ Intermediate extends ReturnType[] = ReturnType[],
        /**/>(
        // The initial value/context of the reduction
        seed: ReductionStep<StartType, ReductionContext> | null                    = null,
        // The item being acted on
        target: Subject | null                                                     = null,
        //
        config: SpwItemReductionConfig<ReturnType, ReductionContext, Intermediate> = {mutator: () => null as unknown as ReturnType},
    ): ReturnType {
        type Step =
            ReductionStep<StartType, ReductionContext>
            | ReductionStep<ReturnType, ReductionContext>
            | ReductionStep<null>;
        type ItemPrototype = ComponentPrototype<SpwShape, SpwShape[], ReductionContext>;


        function normalizeWithinContext</**/
            /**/ I extends Intermediate = Intermediate,
            /**/ R extends ReturnType = ReturnType,
            /**/ C extends ReductionContext = ReductionContext
            /**/>(
            prototype: ItemPrototype,
            intermediate: I,
            activeContext: C,
            nextContext: C,
        ): R {
            const evaluate = config.normalizer;
            if (typeof evaluate !== 'function') {
                return intermediate.pop() as R;
            }

            return evaluate(prototype, intermediate, activeContext, nextContext) as unknown as R;
        }

        function generateIntermediateValue(prototype: ItemPrototype, context: ReductionContext): [Intermediate, ReductionContext] {
            const key = prototype.componentName;

            const component =
                      typeof prototype.selector === 'function'
                      ? prototype.selector(target)
                      : prototype.selector;

            const generator =
                      prototype
                          .generator(
                              component,
                              key,
                              context,
                              config.mutator,
                          );

            const subComponents = [] as (ReturnType | ReductionContext)[];
            for (const item of generator) {
                subComponents.push(item as ReturnType & ReductionContext);
            }

            const intermediate = subComponents.slice(0, -1) as Intermediate;
            const nextContext  = subComponents.slice(-1)[0] as InteractionContext as ReductionContext;

            return [intermediate, nextContext];
        }

        function reduce([prev, activeContext]: Step, prototype: ItemPrototype): Step {
            const [intermediate, nextContext] =
                      generateIntermediateValue(prototype,
                                                activeContext as ReductionContext) as [Intermediate, ReductionContext];

            const normalized =
                      normalizeWithinContext(prototype,
                                             intermediate,
                                             activeContext as ReductionContext,
                                             nextContext) as ReturnType;

            const nextValue =
                      (
                          config.accumulator?.(prev as ReturnType, normalized)
                          ?? normalized
                      ) as ReturnType;
            return [nextValue, nextContext];
        }

        const [finalValue] =
                  (this.getComponentPrototypes() as unknown[] as ItemPrototype[])
                      .reduce<Step>(
                          reduce,
                          seed ?? [null, null],
                      ) as Step;
        return finalValue as ReturnType;
    }

    static hydrate<U extends Partial<RawSpwItem> | SpwItem>(
        node: U,
        context: HydrationContext,
    ): SpwItem {
        type Out = [string, SpwShape];
        type Output = Out[];
        type Prototype = ComponentPrototype;
        type Context = typeof context;
        type Intermediate = ([string, SpwShape])[];
        const Ctor = this as typeof SpwItem;

        const seed: [U, Context] = [node, context];

        const reduced = Ctor.reduce(
            seed,
            node,
            {
                mutator(p: SpwShape, key): Out {
                    return [key as string, p];
                },
                accumulator(prev: Output, curr: Output): Output {
                    return [...prev, ...curr];
                },
                normalizer(prototype: Prototype, intermediate: Intermediate, context: Context): Output {
                    const evaluator = prototype.evaluator?.hydrate as Hydrator;
                    const evaluate  = evaluator?.(intermediate, context);
                    if (typeof evaluate !== 'undefined') {
                        return Array.isArray(evaluate) ? evaluate
                                                       : [evaluate]
                    }
                    return intermediate;
                },
            } as SpwItemReductionConfig<Output, Context>,
        );
        const raw     = reduced
            .reduce((t, [currKey, curr]) => {
                if (!currKey) {
                    console.error(currKey);
                    throw new Error('expected key for index')
                }
                const existentValue = t[currKey] as SpwShape;
                return {
                    ...t,
                    [currKey]:
                        typeof existentValue !== 'undefined'
                        ? [
                                ...(
                                    Array.isArray(existentValue)
                                    ? existentValue
                                    : [existentValue]
                                ),
                                curr,
                            ]
                        : curr,
                }
            }, {} as RawSpwItem);
        return new Ctor(raw as RawSpwItem);
    }

    protected static _genericComponent(): Omit<ComponentPrototype<SpwShape>, 'componentName'> {
        return getDefaultComponentPrototype()
    }
}