import { Tokenizer } from "../_types/types";
import { rn_concept_body, rn_concept_close, rn_concept_open, rn_container, rn_domain_body, rn_domain_close, rn_domain_open, rn_essence_body, rn_essence_close, rn_essence_open, rn_location_body, rn_location_close, rn_location_open, rn_node, tok_concept, tok_domain, tok_essence, tok_location } from "../tokens";
import { tokenizerState } from "../util/tokenizerState";

// for performance. This affects which constructs are considered nested
const useStrictNesting = false;

function openBracketAction(token: string, next: string) {
    return {
        // bracket: "@open",
        token,
        next:    useStrictNesting ? next : undefined
    };
}
function closeBracketAction(token: string, next = "@pop") {
    return {
        // bracket: "@close",
        token,
        next:    useStrictNesting ? next : undefined
    };
}

const domainRules   = {
    [rn_domain_open]:  [[/\{/, openBracketAction(tok_domain, tokenizerState(rn_domain_body))]],
    [rn_domain_body]:  [
        { include: tokenizerState(rn_domain_close) },
        { include: tokenizerState(rn_node) },
        [/\s/, "whitespace"]
    ],
    [rn_domain_close]: [[/}/, closeBracketAction(tok_domain)]]
};
const essenceRules  = {
    [rn_essence_open]:  [[/\[/, openBracketAction(tok_essence, tokenizerState(rn_essence_body))]],
    [rn_essence_body]:  [
        { include: tokenizerState(rn_essence_close) },
        { include: tokenizerState(rn_node) },
        [/\s/, "whitespace"]
    ],
    [rn_essence_close]: [[/]/, closeBracketAction(tok_essence)]]
};
const locationRules = {
    [rn_location_open]:  [[/\(/, openBracketAction(tok_location, tokenizerState(rn_location_body))]],
    [rn_location_body]:  [
        { include: tokenizerState(rn_location_close) },
        { include: tokenizerState(rn_node) },
        [/\s/, "whitespace"]
    ],
    [rn_location_close]: [[/\)/, closeBracketAction(tok_location)]]
};
const conceptRules  = {
    [rn_concept_open]:  [[/</, openBracketAction(tok_concept, tokenizerState(rn_concept_body))]],
    [rn_concept_body]:  [
        { include: tokenizerState(rn_concept_close) },
        { include: tokenizerState(rn_node) }
    ],
    [rn_concept_close]: [[/>/, closeBracketAction(tok_concept)]]
};

export const containerRules: Tokenizer = {
    [rn_container]: [
        { include: tokenizerState(rn_domain_open) },
        { include: tokenizerState(rn_concept_open) },
        { include: tokenizerState(rn_essence_open) },
        { include: tokenizerState(rn_location_open) },

        ...(
            useStrictNesting ? [] : [
                { include: tokenizerState(rn_concept_close) },
                { include: tokenizerState(rn_domain_close) },
                { include: tokenizerState(rn_essence_close) },
                { include: tokenizerState(rn_location_close) }
            ]
        )
    ],
    ...domainRules,
    ...essenceRules,
    ...locationRules,
    ...conceptRules
};
