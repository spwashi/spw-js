import { ReductionLifecycleController } from '@constructs/ast/_abstract/_util/reduce/_util/lifecycle/types';

export function runReductionEndLifecycleSync<Context>(
  lifecycle: ReductionLifecycleController,
  lastStep: [any, Context],
): void {
  lifecycle({
    type: 'end-reduction',
    context: lastStep[1],
    payload: lastStep[0],
  });
}
