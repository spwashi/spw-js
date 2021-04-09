import {Grammar} from '@spwashi/language/parsers/grammar/grammar';
import {Rule} from '@spwashi/language/parsers/grammar/rules/rule';
import {topRule} from './top';
import {getBlockNodeRuleList} from './item/impl/nodes/containers';
import {getAtomRuleList} from './item/impl/nodes/atoms';
import {getUtilityRuleList} from './utility/space';
import {getExpressionRuleList} from './item/impl/expressions';


export function init() {
    const rules =
              [
                  topRule,
                  ...getUtilityRuleList(),
                  ...getExpressionRuleList(),
                  ...getAtomRuleList(),
                  ...getBlockNodeRuleList(),
              ];

    const spw = new Grammar();
    rules.forEach((rule: Rule) => spw.addRule(rule));
    return spw;
}