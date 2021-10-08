import { StringNode } from "@constructs/ast";
import { RawConstruct } from "@constructs/ast/_abstract/_types/internal";
import { hydrateRecursively } from "@constructs/ast/_abstract/_util/hydrate/recursive";
import { Construct } from "@constructs/ast/_abstract/construct";
import { initHydrationContext } from "@constructs/runtime/_util/initializers/hydrationContext";
import { initRuntimeWithSrc } from "@constructs/runtime/_util/initializers/runtime";
import { initRuntimeRegisters } from "@constructs/runtime/_util/initializers/runtime/registers";
import { selectAllNodesFromRuntime, selectLastAcknowledgedNodeFromRuntime } from "@constructs/runtime/_util/selectors";
import { spwParser } from "../../../../../../parser/generated";

describe("String Nodes", () => {
    it("test", async (done) => {
        const src      = `[_out {_in something } ]`;
        const raw      = spwParser.parse(src, {}) as RawConstruct;
        const context  = initHydrationContext(initRuntimeRegisters());
        const hydrated = hydrateRecursively(raw, context) as Construct | null;
        console.log(hydrated);
        console.log(await Promise.all(context.top.promises));
        done();
    });
    it("can be parsed", async (done) => {
        const src = ` "this is a string $ - > [] _ . {}!@#$%^&*()_+1234567890-=''"`;

        const runtime                     = await initRuntimeWithSrc(src);
        const last: Construct | undefined = selectLastAcknowledgedNodeFromRuntime(runtime);
        const all: Construct[]            = selectAllNodesFromRuntime(runtime);
        if (!StringNode.isStringNode(last)) {
            throw new Error("Incorrect type");
        }
        expect(last.kind).toEqual(StringNode.kind);
        expect(last.kind).toEqual(StringNode.kind);
        expect(last.key).toEqual(`"this is a string $ - > [] _ . {}!@#$%^&*()_+1234567890-=''"`);
        expect(all.length).toEqual(1);

        done();
    });
});
