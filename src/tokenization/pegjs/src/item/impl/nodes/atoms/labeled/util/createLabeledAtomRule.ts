import {Pattern} from '@spwashi/language/parsers/grammar/pattern/pattern';
import {Rule, rule} from '@spwashi/language/parsers/grammar/rules/rule';
import patterns from '@spwashi/language/parsers/grammar/pattern/sub';
import {anchorNodeRulePattern} from '../../pure/impl/anchor/anchor.ref';

export function createLabeledAtomRule(token: Pattern, ruleName: string, nodeName: string): Rule {
    return rule(
        ruleName,
        patterns.any([
                         patterns.sequence([token.named('token'),
                                            patterns.string('_'),
                                            anchorNodeRulePattern.named('label')])
                                 .withAction('{return {token, label}'),
                         token,
                     ])
                .named('components'),
        // language=JavaScript
        `return toSpwItem({kind: "${nodeName}", ...components})`,
    );
}
