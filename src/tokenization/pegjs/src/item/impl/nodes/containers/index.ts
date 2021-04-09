import {domainRule} from './impl/domain/domain';
import {essenceRule} from './impl/essence/essence';
import {conceptDomainRule} from './impl/concept/rule';
import {groupRule} from './impl/group/group';


export const getBlockNodeRuleList        =
                 () => {
                     return [
                         ...domainRule,
                         ...essenceRule,
                         ...conceptDomainRule,
                         ...groupRule,
                     ]
                 }