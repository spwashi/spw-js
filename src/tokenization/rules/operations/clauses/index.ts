import patterns from '@spwashi/language/language/parser-generation/grammar/pattern/sub';
import {getComponentName, Pattern} from '@spwashi/language/language/parser-generation/grammar/pattern/pattern';

const whitespace                   = patterns.regExp('\\t ');
const whitespace_nl                = patterns.regExp('\\n\\t ');
const nodePatterns                 = [
    // static
    patterns.rule('String'),
    patterns.rule('Anchor'),

    // domains
    patterns.rule('Essence'),
    patterns.rule('Domain'),
    patterns.rule('Aside'),
    patterns.rule('Concept'),
];
export const actorClause           = patterns.any(nodePatterns, 'actor');
export const o_TargetClause        = patterns.optional(patterns.any(nodePatterns, 'node', 'return node'), 'target');
export const o_WhitespaceClause    = patterns.zeroOrMore(whitespace);
export const o_Whitespace_nlClause = patterns.zeroOrMore(whitespace_nl);
export const o_consequenceClause   = patterns.optional(patterns.rule('ConsequentialTransport'),
                                                       'consequence');

export function getPlainClause(anchorRuleClause: Pattern, kind: string) {
    const componentName = getComponentName(anchorRuleClause);
    if (componentName !== 'label') {
        throw new Error('The rule must be named "label", not ' + componentName)
    }
    return patterns.sequence([
                                 anchorRuleClause,
                                 o_WhitespaceClause,
                                 o_TargetClause,
                                 o_Whitespace_nlClause,
                                 o_consequenceClause,
                             ], null,
                             // language=JavaScript
        `
            target      = void 0 !== target ? target : null;
            consequence = void 0 !== consequence ? consequence : null;
            if (!target && !consequence) return label;
            return spwNode({
                               kind: '${kind}',
                               label, target, consequence
                           })
        `);
}

export function getActorClause(anchorRuleClause: Pattern, kind: string) {
    return patterns.sequence([
                                 actorClause,
                                 o_WhitespaceClause,
                                 anchorRuleClause,
                                 o_WhitespaceClause,
                                 o_TargetClause,
                                 o_Whitespace_nlClause,
                                 o_consequenceClause,
                             ], null,
                             // language=JavaScript
        `
            target      = void 0 !== target ? target : null;
            consequence = void 0 !== consequence ? consequence : null;

            if (!target && !consequence) return label;

            return spwNode({
                               kind: '${kind}',
                               actor,
                               label, target, consequence
                           })
        `);
}
