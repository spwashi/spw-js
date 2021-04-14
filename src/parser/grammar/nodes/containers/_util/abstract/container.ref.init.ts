import {referenceTo, RuleReferenceCombinator} from '@spwashi/language/parsers/grammar/combinators';


type Ref = { name: string, ref: RuleReferenceCombinator };
export function getContainerNodeComponentReferences(ruleName: string): { open: Ref, body: Ref, close: Ref, } {
    const open  = `${ruleName}Open`;
    const close = `${ruleName}Close`;
    const body  = `${ruleName}Body`;
    return {
        open:  {
            name: open,
            ref:  referenceTo(open),
        },
        body:  {
            name: body,
            ref:  referenceTo(body),
        },
        close: {
            name: close,
            ref:  referenceTo(close),
        },
    };
}