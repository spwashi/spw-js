import {
  ConstructReductionConfig,
  ConstructReductionOptions,
} from '@constructs/ast/_abstract/_types';
import { InteractionContext } from '@constructs/ast/_abstract/_types/interaction/context/interactionContext';
import { ReductionLifecycleController } from '@constructs/ast/_abstract/_util/reduce/_/types';

export function completeConfig<C extends InteractionContext = InteractionContext>(
  options: ConstructReductionOptions<C> = {},
): ConstructReductionConfig<C> {
  const {
    getValueFromSubject = () => null,
    reduceStep = (_, next) => next,
    normalizeComponentReductionValues = (_: any, [v, c]) => {
      return [Array.isArray(v) ? v.pop() : v, c] as [typeof v, C];
    },
  } = options;

  return {
    reduceStep,
    getValueFromSubject,
    normalizeComponentReductionValues,
  } as ConstructReductionConfig<C>;
}

export const defaultLifecycleGenerator: ReductionLifecycleController = ({ type }) => {
  switch (type) {
    case 'eval':
    case 'begin-reduction':
    default:
      return function* (s) {
        yield s;
      };
  }
};
