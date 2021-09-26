type LifecycleStepType = 'begin-reduction' | 'end-reduction' | 'eval';
type LifecycleStep = {
  type: LifecycleStepType;
  [k: string]: any;
};
export type ReductionLifecycleController = (
  lifecycleStep: LifecycleStep,
) => (generatorStart?: any) => Generator<any>;
