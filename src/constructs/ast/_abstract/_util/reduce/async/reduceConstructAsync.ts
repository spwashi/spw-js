import { ConstructReductionConfig } from '@constructs/ast/_abstract/_types';
import { IConstructComponent } from '../../../_types/IConstructComponent';
import { InteractionContext } from '@constructs/ast/_abstract/_types/interaction/context/interactionContext';
import { defaultLifecycleController } from '@constructs/ast/_abstract/_util/reduce/_util/lifecycle/default';
import { ReductionLifecycleController } from '@constructs/ast/_abstract/_util/reduce/_util/lifecycle/types';
import { getConstructReducerAsync } from '@constructs/ast/_abstract/_util/reduce/async/_util/getConstructReducerAsync';
import { runReductionBeginLifecycleAsync } from '@constructs/ast/_abstract/_util/reduce/async/_util/lifecycle/beginReduction';
import { runReductionEndLifecycleAsync } from '@constructs/ast/_abstract/_util/reduce/async/_util/lifecycle/endReduction';

/**
 * Reduce a construct asynchronously
 *
 * @param subject
 * @param reductionConfig
 * @param seed
 * @param prototypes
 * @param lifecycle
 */
export async function reduceConstructAsync<
  Context extends InteractionContext = InteractionContext,
  Subject = any,
  StartType = any,
  ReturnType = any,
>(
  subject: Subject | null,
  reductionConfig: ConstructReductionConfig<Context>,
  seed: [StartType | null, Context | null]           = [null, null],
  prototypes: Iterable<IConstructComponent<Context>> = [],
  lifecycle: ReductionLifecycleController            = defaultLifecycleController,
): Promise<[ReturnType, Context]> {
  await runReductionBeginLifecycleAsync(lifecycle, { seed, subject });
  const reduceConstruct = getConstructReducerAsync<Context>(reductionConfig, lifecycle, prototypes);
  const lastStep = await reduceConstruct(seed, subject);
  await runReductionEndLifecycleAsync(lifecycle, lastStep);
  return lastStep;
}
