import { initInteractionContext } from "@constructs/ast/_abstract/_types/interaction/context/initInteractionContext";
import { InteractionContext } from "@constructs/ast/_abstract/_types/interaction/context/interactionContext";
import { HydrationContext } from "@constructs/ast/_abstract/_util/hydrate/_util/util";
import { hydrateShallowInContext } from "@constructs/ast/_abstract/_util/hydrate/shallow";
import { NumberNode } from "@constructs/ast/nodes/scalars/number/construct";

describe("Number", () => {
    it("should be instantiable", function() {
        const n = new NumberNode({ kind: "number", value: "4" });
        expect(n.key).toEqual("4");
    });
    it("should be instantiable", function() {
        const n = new NumberNode({ kind: "number", value: "4" });
        expect(n.key).toEqual("4");
    });
    it("should be hydrate-able", async function() {
        const raw               = { value: "4", kind: "number" };
        const context           = initInteractionContext() as HydrationContext;
        const { node, promise } = hydrateNumber(raw, context);

        NumberNode.components.value.asyncSubjectGenerator = async function* (
            _: any,
            context: InteractionContext | null
        ) {
            yield [4000, context];
            return null;
        };

        expect(node).toBeInstanceOf(NumberNode);
        const out   = await promise;
        const doLog = false;
        doLog && console.log(node, out);
        // expect(out.internal.value).toEqual(4000);
    });
});

/**
 * Function for hydrating
 *
 * @param raw
 * @param context
 */
function hydrateNumber(raw: any, context: HydrationContext) {
    const { node: hydratedNode, promise } = hydrateShallowInContext([raw, context]);
    if (context.absorb) {
        context.absorb(hydratedNode);
    }
    return {
        node:    hydratedNode,
        promise: Promise.resolve(promise)
    };
}
