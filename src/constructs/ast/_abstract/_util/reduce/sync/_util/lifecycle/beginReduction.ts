import { ReductionLifecycleController } from '@constructs/ast/_abstract/_util/reduce/_util/lifecycle/types';

export function runReductionBeginLifecycleSync<StartType, Context, Subject>(
  lifecycle: ReductionLifecycleController,
  seed: [StartType | null, Context | null],
  subject: Subject | null,
): void {
  lifecycle({
    type: 'begin-reduction',
    context: seed[1],
    payload: subject,
  });
}
