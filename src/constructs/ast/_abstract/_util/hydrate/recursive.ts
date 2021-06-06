import { Construct } from '../../construct';
import {
  HydratedSpwItem,
  RawSpwConstruct,
  SpwItemValue,
} from '@constructs/ast/_abstract/_types/internal';
import {
  HydrationContext,
  HydrationInput,
} from '@constructs/ast/_abstract/_util/hydrate/_/util';
import { SpwNodeLocation } from '@constructs/ast/_util/ast/location';

type ObjectOfSpw = { [k: string]: SpwItemValue };

/**
 * Add the current location to the
 * @param location
 * @param context
 */
function normalizeLocation(location: SpwNodeLocation | null | undefined) {
  return location ? { ...location } : null;
}

/**
 * The non-recursive "hydrate" action
 *
 * @param node
 * @param context
 */
function hydrateConstruct(
  n: Partial<RawSpwConstruct>,
  context: HydrationContext,
) {
  const node = n as RawSpwConstruct;
  if (!n.kind) throw new Error('trying to hydrate without a kind');
  if (!context.hydrate) {
    throw new Error('Cannot hydrate without hydrator');
  }
  const prehydrated = Object.entries(node)
    .filter(([k]) => !['kind', 'location', 'src', 'key'].includes(k))
    .reduce(
      (all, [key, value]) => ({
        ...all,
        [key]: !value
          ? value
          : hydrateRecursively(value as HydrationInput, context),
      }),
      {
        kind: node.kind,
        location: normalizeLocation(node.location),
      },
    ) as Partial<HydratedSpwItem>;

  // note: avoid a loop here if undesired
  return context.hydrate(prehydrated, context);
}

/**
 * For things that aren't shaped like SpwItems
 *
 * @param n
 * @param hydrationContext
 */
function hydratePrimitive(
  n: HydrationInput,
  hydrationContext: HydrationContext,
) {
  if (!n || typeof n !== 'object') {
    return n;
  }
  return Object.fromEntries(
    Object.entries(n).map(([key, rawNode]) => [
      key,
      hydrateRecursively(rawNode as HydrationInput, hydrationContext),
    ]),
  ) as ObjectOfSpw;
}

function isArray(node: HydrationInput): node is Partial<RawSpwConstruct>[] {
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
): Construct | Construct[] | ObjectOfSpw | null {
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
