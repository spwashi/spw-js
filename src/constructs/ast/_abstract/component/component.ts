import {
  ComponentDescription,
  ComponentEvaluatorObject,
  InteractionGenerator,
} from '../_types';
import { RawSpwConstruct } from '../_types/internal';

const defaultGenerator = function* (component, ctxt) {
  if (
    typeof component === 'object' &&
    component &&
    typeof component[Symbol.iterator] === 'function'
  ) {
    for (const sub of component) {
      if (component == void 0) continue;
      yield [sub, ctxt];
    }
  } else if (component) {
    yield [component, ctxt];
  }

  return null;
} as InteractionGenerator;

const defaultEvaluator = {
  hydrate: function (items: RawSpwConstruct[] | undefined) {
    return items;
  },
  stringify: function (items) {
    return Array.from(items ?? [])
      .filter(Boolean)
      .filter(Boolean)
      .join('');
  },
} as ComponentEvaluatorObject;

function makeSelector(
  override: Partial<ComponentDescription<any, any[], any, any>> & {
    name: string;
  },
) {
  return function (s: any) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const componentName = <string | undefined>override.name;
    if (!componentName) return null;
    return s?.[componentName as string] ?? null;
  };
}
function makeEvaluators(
  override: Partial<ComponentDescription<any, any[], any, any>> & {
    name: string;
  },
) {
  return { ...defaultEvaluator, ...(override.evaluators ?? {}) };
}

export type LanguageComponentProps = Partial<ComponentDescription> & {
  name: string;
};

export default function LanguageComponentConstructor(
  config: LanguageComponentProps,
): ComponentDescription {
  const defaultSelector = makeSelector(config);
  const evaluators = makeEvaluators(config) as ComponentEvaluatorObject;

  return {
    selector: defaultSelector,
    generator: defaultGenerator,
    ...config,
    evaluators,
  };
}
