import { ruleName } from '@grammar/top/top.ref';
import { Grammar } from '@spwashi/language/parsers/grammar';
import { expressionRules } from './ast/expressions/_abstract/_list/rules';
import nodeRules from './ast/nodes/_abstract/_list/rules';
import { topRule } from './top/top.rule';
import { baseRules } from './utility/rules';

export const allowedStartRules = [ruleName];

export default new Grammar([topRule, ...baseRules, ...nodeRules, ...expressionRules]);
export { stdPrefixExpNodes } from '@grammar/ast/expressions/operations/_util/prefixed/tail';
