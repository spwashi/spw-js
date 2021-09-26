import { ReductionLifecycleController } from '@constructs/ast/_abstract/_util/reduce/_util/lifecycle/types';

export async function runEvaluationLifecycleAsync<Context, Intermediate>(
  lifecycle: ReductionLifecycleController,
  [startVal, context]: [any, Context],
): Promise<{
  context: Context;
  values: Promise<Intermediate>[];
}> {
  const evalGenerator = lifecycle({ type: 'eval' });
  const lifecycleGenerator = evalGenerator([startVal, context]);

  const values: Promise<Intermediate>[] = [];

  const out = {
    context,
    values,
  };

  for (let value, done; ({ value, done } = lifecycleGenerator.next()), !done; ) {
    if (value === undefined) {
      continue;
    }
    const [subject, context] = value;
    out.values.push(subject);
    out.context = context;
  }

  return out;
}
