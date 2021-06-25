import { ConstructKind } from '../_types/kinds';
import {
  ComponentDescription,
  ComponentEvaluatorObject,
  ConstructReductionOptions,
  InteractionContext,
  PlainInteractionContext,
  ConstructComponentKey,
} from '@constructs/ast/_abstract/_types';
import { reduceConstructSync } from '@constructs/ast/_abstract/_util/reduce/sync';
import { LanguageComponent } from '@constructs/ast/_abstract/component';
import { reduceConstructAsync } from '@constructs/ast/_abstract/_util/reduce/async';
import { completeConfig } from '@constructs/ast/_abstract/_util/reduce/_/util';

export interface IConstructClass<K extends ConstructKind = ConstructKind> {
  readonly kind: K;
}

type ConstructInitializer = any;

export type ConstructComponents = Iterable<ComponentDescription> & {
  [k: string]: ComponentDescription | any;
};

type KeyReductionSeed = [string, InteractionContext];

/**
 * Represents the most abstract item in a Spw syntax tree
 */
export class Construct<
  K extends ConstructKind = ConstructKind,
  U extends ConstructInitializer = ConstructInitializer,
> {
  static readonly kind: ConstructKind = 'unknown';

  static components: ConstructComponents | null = null;

  readonly kind: K = 'unknown' as K;

  protected readonly _internal: U | null;

  constructor(internal?: U) {
    const constructor = (<typeof Construct>this.constructor) as unknown as typeof Construct;
    this.kind = constructor.kind as K;
    this._internal = internal || null;

    Object.assign(this, this._internal);
  }

  get internal(): U | null {
    return this._internal;
  }

  get key(): ConstructComponentKey {
    type Output = ConstructComponentKey;
    type Context = typeof context;
    type Prototype = ComponentDescription;
    type Seed = KeyReductionSeed;

    const context = PlainInteractionContext().enter();
    const Ctor = this.constructor as typeof Construct;
    const seed: Seed = ['', context];

    const reduced = Ctor.reduce(
      this.internal ?? null,
      {
        valueMapper(subject) {
          if ((typeof subject === 'string' && subject) || typeof subject === 'number') {
            return subject;
          }
          return subject?.key;
        },

        stepNormalizer(prototype: Prototype, [intermediate, context]) {
          const evaluator = prototype.evaluators.stringify as ComponentEvaluatorObject['stringify'];
          let evaluated: string | null;
          if (evaluator) {
            evaluated = evaluator(intermediate, context);
          } else {
            evaluated = intermediate ? intermediate[intermediate.length - 1] : null;
          }
          return [evaluated, context] as [Output, Context];
        },

        stepReducer([prev], [curr, next]) {
          return [[prev, curr].join(''), next] as [ConstructComponentKey, InteractionContext];
        },
      },
      seed,
    );

    return reduced[0];
  }

  static isConstruct(node: Construct | any): node is Construct {
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
  static reduce<
    ReturnType = any,
    Intermediate extends any = ReturnType,
    StartType = any,
    Subject = any,
    ReductionContext extends InteractionContext = InteractionContext,
    _Output extends [ReturnType, ReductionContext] = [ReturnType, ReductionContext],
  >(
    subject: Subject | null = null,
    options: ConstructReductionOptions<ReductionContext, ReturnType, Intermediate> | null = null,
    seed: [StartType, ReductionContext] | [null, null] = [null, null],
  ): _Output {
    return reduceConstructSync<ReductionContext>(
      subject,
      completeConfig<ReductionContext>(options ?? {}),
      seed,
      (this.components ?? []) as ComponentDescription<ReductionContext>[],
    ) as _Output;
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
  static async reduceAsync<
    //
    ReductionContext extends InteractionContext = InteractionContext,
    ReturnType = any,
    Intermediate extends any = ReturnType,
    StartType = any | null,
    Subject = any,
    _Output extends [ReturnType, ReductionContext] = [ReturnType, ReductionContext],
  >(
    subject: Subject | null = null,
    options: ConstructReductionOptions<ReductionContext, ReturnType, Intermediate> | null = null,
    seed: [StartType, ReductionContext | null] | [null, null] = [null, null],
  ): Promise<_Output> {
    return reduceConstructAsync<ReductionContext>(
      subject,
      completeConfig<ReductionContext>(options ?? {}),
      seed,
      (this.components ?? []) as ComponentDescription<ReductionContext>[],
    ) as Promise<_Output>;
  }

  /**
   * create a Construct component
   * @param override
   * @protected
   */
  protected static makeComponent(
    override: {
      name: string;
      [k: string]: any;
    } & Partial<ComponentDescription>,
  ): ComponentDescription {
    return new LanguageComponent(override);
  }
}
