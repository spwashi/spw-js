import {Register} from '@constructs/runtime/register';
import {Runtime} from '@constructs/runtime/runtime';
import {spwParser} from '../../../../parser/generated';
import {RawSpwConstruct} from '@constructs/ast/_abstract/_types/internal';
import {hydrateRecursively} from '@constructs/ast/_abstract/_util/hydrate/recursive';
import {initHydrationContext} from '@constructs/ast/_util/runtime/initHydrationContext';

/**
 * Initialize a Runtime
 *
 * @param src
 */
export async function initRuntime(src: string): Promise<Runtime> {
    const registers =
              {
                  all:              new Register(),
                  lastAcknowledged: new Register({memory: 1}),
                  keys:             {} as { [k: string]: Register },
              };

    const raw = spwParser.parse(src, {}) as RawSpwConstruct;

    const context = initHydrationContext(registers);

    hydrateRecursively(raw, context);

    return {
        registers,
    };
}