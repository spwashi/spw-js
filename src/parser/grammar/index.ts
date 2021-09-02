import { Grammar } from '@spwashi/language/parsers/grammar';
import { topRule } from './top/top.rule';
import { baseRules } from './utility/_list.rules';
import { expressionRules } from './ast/expressions/_abstract/_list/expressions.list.rule';
import nodeRules from './ast/nodes/_abstract/_list/node.list.rule';
import { ruleName } from '@grammar/top/top.ref';

export const allowedStartRules = [ruleName];

export default new Grammar([topRule, ...baseRules, ...nodeRules, ...expressionRules]);
