import {
  ConstructReductionConfig,
  ConstructReductionOptions,
} from '@constructs/ast/_abstract/_types';
import { InteractionContext } from '@constructs/ast/_abstract/_types/interaction/context/interactionContext';

export function completeConstructReductionConfig<C extends InteractionContext = InteractionContext>(
  options: ConstructReductionOptions<C> = {},
): ConstructReductionConfig<C> {
  const {
    deriveSubject = () => null,
    reduceStep = (_, next) => next,
    normalizeStep = (_: any, [v, c]) => {
      return [Array.isArray(v) ? v.pop() : v, c] as [typeof v, C];
    },
  } = options;

  return {
    reduceStep,
    deriveSubject,
    normalizeStep,
  } as ConstructReductionConfig<C>;
}
