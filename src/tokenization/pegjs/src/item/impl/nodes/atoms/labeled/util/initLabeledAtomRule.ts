import {ISpwItemStatic} from '@constructs/item/abstract/item';
import patterns from '@spwashi/language/parsers/grammar/pattern/sub';
import {createLabeledAtomRule} from './createLabeledAtomRule';
import {IUnaryTokenStatic} from '@constructs/item/impl/nodes/impl/atoms/labeled/abstract/interfaces/unary';
import {Rule} from '@spwashi/language/parsers/grammar/rules/rule';
import {RuleReferencePattern} from '@spwashi/language/parsers/grammar/pattern/sub/rule-reference';

export default function initRuleFromSpwNode(SpwNode: ISpwItemStatic & IUnaryTokenStatic & { name: string }): { rule: Rule, referencePattern: RuleReferencePattern } {
    const ruleName         = SpwNode.name;
    const token            = patterns.string(SpwNode.token);
    const referencePattern = patterns.reference(ruleName);
    const rule             = createLabeledAtomRule(token, ruleName, SpwNode.kind);

    return {rule, referencePattern};
}