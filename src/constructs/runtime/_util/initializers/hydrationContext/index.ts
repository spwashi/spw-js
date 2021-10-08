import { ConstructComponentKey } from "@constructs/ast/_abstract/_types";
import { initInteractionContext } from "@constructs/ast/_abstract/_types/interaction/context/initInteractionContext";
import { HydratedConstruct, RawConstruct } from "@constructs/ast/_abstract/_types/internal";
import { AbsorbInput, AbsorbOutput, HydrationContext } from "@constructs/ast/_abstract/_util/hydrate/_util/util";
import { hydrateShallowInContext } from "@constructs/ast/_abstract/_util/hydrate/shallow";
import { Construct } from "@constructs/ast/_abstract/construct";
import { RuntimeRegisters } from "@constructs/runtime/_util/_types/registers";
import { Register } from "@constructs/runtime/register/register";

type PartialHydrationContext =
    Partial<HydrationContext>
    & {
        registers: RuntimeRegisters;
    };


function appendToIndexRegister(
    registers: RuntimeRegisters,
    key: ConstructComponentKey,
    node: Construct | HydratedConstruct
) {
    if (!key) {
        return;
    }

    const keys        = registers.indexed.set(key, registers.indexed.get(key) ?? new Register());
    const keyRegister = keys.get(key) as Register<typeof node>;

    keyRegister.push(node);
}

function appendToCollectiveRegister(registers: RuntimeRegisters, node: Construct) {
    const resolved = registers.all.resolve(node);
    if (!resolved) {
        registers.all.push(node);
    }
}

function appendToSubjectRegister(registers: RuntimeRegisters, node: Construct) {
    registers.subject.push(node);
}


/**
 * Initialize a HydrationContext {@see HydrationContext}
 *
 * @param registers
 */
export function initHydrationContext(registers: RuntimeRegisters): HydrationContext {
    return initInteractionContext(
        {
            kind:      "hydrationContext",
            registers: registers,
            hydrate(node: RawConstruct, context: HydrationContext): Construct | null {
                const hydrated = hydrateShallowInContext([node, context]);

                return hydrated.node;
            },
            absorb(node: AbsorbInput): AbsorbOutput | null {
                if (!Construct.isConstruct(node)) {
                    console.log(node);
                    return node;
                }
                const registers = this.registers;
                appendToCollectiveRegister(registers, node);
                appendToSubjectRegister(registers, node);
                appendToIndexRegister(registers, node.key, node);
                return node;
            }
        } as PartialHydrationContext
    ) as HydrationContext;
}
