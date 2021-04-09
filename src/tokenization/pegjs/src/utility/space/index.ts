import { Rule } from '@spwashi/language/parsers/grammar/rules/rule';
import {spaceNodeRule} from './space';

export const getUtilityRuleList =
                 ():Rule[] => [
                     spaceNodeRule,
                 ]