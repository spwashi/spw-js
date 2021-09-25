import {
  ConstructComponentValue,
  HydratedConstruct,
  RawConstruct,
} from '@constructs/ast/_abstract/_types/internal';
import { HydrationContext, HydrationInput } from '@constructs/ast/_abstract/_util/hydrate/_/util';
import { ConstructLocation } from '@constructs/ast/_util/ast/location';
import { Construct } from '../../construct';

type ConstructObject = { [k: string]: ConstructComponentValue };

/**
 * Add the current location to the
 * @param srcloc
 * @param context
 */
function normalizeLocation(srcloc: ConstructLocation | null | undefined) {
  return srcloc ? { ...srcloc } : null;
}

/**
 * The non-recursive "hydrate" action
 *
 * @param node
 * @param context
 */
function hydrateConstruct(n: Partial<RawConstruct>, context: HydrationContext) {
  const node = n as RawConstruct;
  if (!n.kind) throw new Error('trying to hydrate without a kind');

  const propertiesToIgnore = ['kind', 'key'] as (keyof RawConstruct)[];
  const ignoreProperties = ([k]: [string, any]) => !propertiesToIgnore.includes(k);
  const prehydrated = Object.entries(node)
    .filter(ignoreProperties)
    .reduce(
      (all, [key, value]) => {
        const propertiesNotToHydrate = [
          //
          'src',
          'srcloc',
        ];
        if (([...propertiesNotToHydrate] as (keyof RawConstruct)[]).includes(key)) {
          return {
            ...all,
            [key]: value,
          };
        }
        return {
          ...all,
          [key]: !value ? value : hydrateRecursively(value as HydrationInput, context),
        };
      },
      {
        kind: node.kind,
        srcloc: normalizeLocation(node.srcloc),
      },
    ) as Partial<HydratedConstruct>;

  const posthydrated = context.hydrate(prehydrated, context);

  return posthydrated;
}

/**
 * For things that aren't shaped like Constructs
 *
 * @param n
 * @param hydrationContext
 */
function hydratePrimitive(n: HydrationInput, hydrationContext: HydrationContext) {
  if (!n || typeof n !== 'object') {
    return n;
  }
  return Object.fromEntries(
    Object.entries(n).map(([key, rawNode]) => [
      key,
      hydrateRecursively(rawNode as HydrationInput, hydrationContext),
    ]),
  ) as ConstructObject;
}

function isArray(node: HydrationInput): node is Partial<RawConstruct>[] {
  return Array.isArray(node);
}

/**
 *
 * @param node
 * @param hydrationContext
 */
export function hydrateRecursively(
  node: HydrationInput,
  hydrationContext: HydrationContext,
): Construct | Construct[] | ConstructObject | null {
  // hydrate arrays
  if (isArray(node)) {
    return node
      .filter(Boolean)
      .map((node) => hydrateRecursively(node, hydrationContext))
      .reduce((acc: Construct[], val) => acc.concat(val as Construct), []);
  }

  return !node?.kind
    ? hydratePrimitive(node, hydrationContext)
    : hydrateConstruct(node, hydrationContext);
}
