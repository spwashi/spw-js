import { ConstructReductionConfig } from '@constructs/ast/_abstract/_types';
import { ComponentDescription } from '@constructs/ast/_abstract/_types/componentDescription';
import { InteractionContext } from '@constructs/ast/_abstract/_types/interaction/context/interactionContext';
import { defaultLifecycleController } from '@constructs/ast/_abstract/_util/reduce/_util/lifecycle/default';
import { ReductionLifecycleController } from '@constructs/ast/_abstract/_util/reduce/_util/lifecycle/types';
import { getConstructReducerSync } from '@constructs/ast/_abstract/_util/reduce/sync/_util/getConstructReducerSync';
import { runReductionBeginLifecycleSync } from '@constructs/ast/_abstract/_util/reduce/sync/_util/lifecycle/beginReduction';
import { runReductionEndLifecycleSync } from '@constructs/ast/_abstract/_util/reduce/sync/_util/lifecycle/endReduction';

/**
 * Reduce a construct synchronously
 *
 * @param subject
 * @param config
 * @param seed
 * @param prototypes
 * @param lifecycle
 */
export function reduceConstructSync<
  Context extends InteractionContext = InteractionContext,
  Subject = any,
  StartType = any | null,
  ReturnType = any,
>(
  subject: Subject | null,
  config: ConstructReductionConfig<Context>,
  seed: [StartType | null, Context | null] = [null, null],
  prototypes: Iterable<ComponentDescription<Context>> = [],
  lifecycle: ReductionLifecycleController = defaultLifecycleController,
): [ReturnType, Context] {
  runReductionBeginLifecycleSync(lifecycle, seed, subject);
  const reduceConstruct = getConstructReducerSync<Context>(config, lifecycle, prototypes);
  const lastStep = reduceConstruct(seed, subject);
  runReductionEndLifecycleSync(lifecycle, lastStep);
  return lastStep;
}
