import {domainRule} from './impl/domain/domain';
import {essenceRule} from './impl/essence/essence';
import {conceptDomainRule} from './impl/concept/rule';
import {groupRule} from './impl/group/group';
import {Rule} from '@spwashi/language/parsers/grammar/rules/rule';


export const getBlockNodeRuleList =
                 (): Rule[] => {
                     return [
                         ...domainRule,
                         ...essenceRule,
                         ...conceptDomainRule,
                         ...groupRule,
                     ]
                 }