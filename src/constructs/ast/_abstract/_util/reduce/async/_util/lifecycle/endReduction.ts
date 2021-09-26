import { ReductionLifecycleController } from '@constructs/ast/_abstract/_util/reduce/_util/lifecycle/types';

export async function runReductionEndLifecycleAsync<Context>(
  lifecycle: ReductionLifecycleController,
  [subject, context]: [any, Context],
): Promise<void> {
  const generator = await lifecycle({ type: 'end-reduction', context, payload: subject });
  for (const out of generator()) {
    if (out === false) {
      throw new Error('this is not yet handled');
    }
  }
}
