import {
  ConstructReductionConfig,
  ConstructReductionOptions,
} from '@constructs/ast/_abstract/_types';
import { InteractionContext } from '@constructs/ast/_abstract/_types/interaction/context/interactionContext';

export function fillReductionConfig<C extends InteractionContext = InteractionContext>(
  options: ConstructReductionOptions<C> = {},
): ConstructReductionConfig<C> {
  const {
    deriveSubjectValue = () => null,
    reduceStep = (_, next) => next,
    normalizeStep = (_: any, [v, c]) => {
      return [Array.isArray(v) ? v.pop() : v, c] as [typeof v, C];
    },
  } = options;

  return {
    reduceStep,
    deriveSubjectValue,
    normalizeStep,
  } as ConstructReductionConfig<C>;
}
