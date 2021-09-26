import { ReductionLifecycleController } from '@constructs/ast/_abstract/_util/reduce/_util/lifecycle/types';

export function runEvaluationLifecycleSync<Context, Intermediate>(
  lifecycle: ReductionLifecycleController,
  [startVal, context]: [any, Context],
): { values: Intermediate[]; context: Context } {
  const values: Intermediate[] = [];
  const out = { values, context };

  const init = lifecycle({ type: 'eval' });
  const evalGenerator = init([startVal, context]);

  // loop over generator
  for (let value, done; ({ value, done } = evalGenerator.next()), !done; ) {
    if (value === undefined) {
      continue;
    }

    if (value === false) {
      throw new Error('This is not yet handled');
    }

    const [val, ctxt] = value;
    out.values = [...out.values, val];
    out.context = ctxt;
  }

  return out;
}
