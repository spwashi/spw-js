import {
  ConstructReductionConfig,
  ConstructReductionOptions,
  InteractionContext,
} from '@constructs/ast/_abstract/_types';
import { ReductionLifecycleController } from '@constructs/ast/_abstract/_util/reduce/_/types';

export function completeConfig<
  C extends InteractionContext = InteractionContext,
>(options: ConstructReductionOptions<C> = {}): ConstructReductionConfig<C> {
  const {
    evaluator = () => null,
    reducer = (_, next) => next,
    stepNormalizer = (_: any, [v, c]) => {
      return [Array.isArray(v) ? v.pop() : v, c] as [typeof v, C];
    },
  } = options;

  return {
    reducer,
    evaluator,
    stepNormalizer,
  };
}
export const defaultLifecycleGenerator: ReductionLifecycleController = ({
  type,
}) => {
  switch (type) {
    case 'eval':
    case 'begin-reduction':
    default:
      return function* (s) {
        yield s;
      };
  }
};
