import { Construct } from '../../construct';
import {
  HydratedConstruct,
  RawConstruct,
  ConstructComponentValue,
} from '@constructs/ast/_abstract/_types/internal';
import { HydrationContext, HydrationInput } from '@constructs/ast/_abstract/_util/hydrate/_/util';
import { ConstructLocation } from '@constructs/ast/_util/ast/location';

type ConstructObject = { [k: string]: ConstructComponentValue };

/**
 * Add the current location to the
 * @param location
 * @param context
 */
function normalizeLocation(location: ConstructLocation | null | undefined) {
  return location ? { ...location } : null;
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

  const prehydrated = Object.entries(node)
    .filter(([k]) => !['kind', 'loc', 'src', 'key'].includes(k))
    .reduce(
      (all, [key, value]) => ({
        ...all,
        [key]: !value ? value : hydrateRecursively(value as HydrationInput, context),
      }),
      {
        kind: node.kind,
        location: normalizeLocation(node.location),
      },
    ) as Partial<HydratedConstruct>;

  // note: avoid a loop here if undesired
  return context.hydrate(prehydrated, context);
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

  // hydrate objects
  return !node?.kind
    ? hydratePrimitive(node, hydrationContext)
    : hydrateConstruct(node, hydrationContext);
}
