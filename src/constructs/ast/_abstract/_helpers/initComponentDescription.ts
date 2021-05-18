import {ComponentDescription, ComponentEvaluatorObject, InteractionGenerator, SpwShape} from '@constructs/ast/_abstract/types';
import {RawSpwItem} from '@constructs/ast/_abstract/interfaces/internal';

/**
 * Returns an object that describes a very generic component
 */
export function initComponentDescription(override: Partial<ComponentDescription> & { name: string }): ComponentDescription {
    const defaultSelector  =
              function (s: SpwShape) {
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  const componentName = <string | undefined>override.name;
                  if (!componentName) return null;
                  return s?.[componentName as string] ?? null;
              };
    const defaultGenerator =
              function* (component, key, ctxt, mut) {
                  if (typeof component === 'object' && component && typeof component[Symbol.iterator] === 'function') {
                      for (const sub of component) {
                          yield mut(sub, key, ctxt);
                      }
                  } else if (component) {
                      yield mut(component, key, ctxt);
                  }
                  yield ctxt;
                  return;
              } as InteractionGenerator;

    const evaluator =
              {
                  hydrate:
                      function (items: RawSpwItem[] | undefined) {
                          return items;
                      },
                  stringify:
                      function (items) {
                          return Array.from(items ?? []).join('');
                      },
              } as ComponentEvaluatorObject;

    const standard =
              {
                  selector:  defaultSelector,
                  generator: defaultGenerator,

                  ...override,

                  evaluators:
                      {
                          ...evaluator,
                          ...override.evaluators ?? {},
                      } as ComponentEvaluatorObject,
              } as ComponentDescription;

    return standard;
}