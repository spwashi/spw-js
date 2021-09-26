import { ReductionLifecycleController } from '@constructs/ast/_abstract/_util/reduce/_util/lifecycle/types';

export async function runReductionBeginLifecycleAsync<StartType, Context, Subject>(
  lifecycle: ReductionLifecycleController,
  input: {
    seed: [StartType | null, Context | null];
    subject: Subject | null;
  },
): Promise<void> {
  const generator = await lifecycle({ type: 'begin-reduction', ...input });
  for (const out of generator()) {
    if (out === false) {
      throw new Error('this is not yet handled');
    }
  }
}
