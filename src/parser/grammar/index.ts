import {Grammar} from '@spwashi/language/parsers/grammar';
import {topRule} from './top/top';
import {containerNodeRules} from './item/nodes/containers/_list.rule';
import {atomNodeRules} from './item/nodes/atoms/index.rule';
import {baseRules} from './_base/_list.rules';
import {expressionRules} from './item/expressions/_list.rule';


export default new Grammar([
                               topRule,
                               ...baseRules,
                               ...atomNodeRules,
                               ...containerNodeRules,
                               ...expressionRules,
                           ]);