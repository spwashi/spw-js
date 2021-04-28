import {Grammar} from '@spwashi/language/parsers/grammar';
import {topRule} from './top/top';
import {baseRules} from './_base/_list.rules';
import {expressionRules} from './expressions/_list.rule';
import nodeRules from './nodes/_list.rule';

export default new Grammar([
                               topRule,
                               ...baseRules,
                               ...nodeRules,
                               ...expressionRules,
                           ]);