import {domainRules} from './domain/rule';
import {essenceRules} from './essence/rule';
import {conceptDomainRules} from './concept/rule';
import {groupRules} from './group/rule';
import {containerNodeRule} from './abstract/rule';


export const containerNodeRules =
                 [
                     containerNodeRule,
                     ...domainRules,
                     ...essenceRules,
                     ...conceptDomainRules,
                     ...groupRules,
                 ]
