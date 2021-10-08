import { ComponentDescription } from '@constructs/ast/_abstract/_types/componentDescription';
import { InteractionContext } from '@constructs/ast/_abstract/_types/interaction/context/interactionContext';

export default function getValueGenerator<Context extends InteractionContext, Subject>(
  description: ComponentDescription<Context>,
  subject: Subject | null,
  context: [any, Context][1],
): Generator<any, any, [any, Context]> {
  const component = description.valueSelector(subject);
  const generator = description.locationGenerator(component, context);
  return generator;
}
