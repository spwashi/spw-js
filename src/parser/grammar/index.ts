import {Grammar} from '@spwashi/language/parsers/grammar';
import {topRule} from './top/top';
import {containerNodeRules} from './nodes/containers/_list.rule';
import {atomNodeRules} from './nodes/atoms/_list.rule';
import {baseRules} from './_base/_list.rules';
import {expressionRules} from './expressions/_list.rule';


export default new Grammar([
                               topRule,
                               ...baseRules,
                               ...atomNodeRules,
                               ...containerNodeRules,
                               ...expressionRules,
                           ]);