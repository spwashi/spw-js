import {domainRules} from './domain/rule';
import {essenceRules} from './essence/rule';
import {conceptDomainRules} from './concept/rule';
import {groupRules} from './group/rule';


export const containerNodeRules =
                 [
                     ...domainRules,
                     ...essenceRules,
                     ...conceptDomainRules,
                     ...groupRules,
                 ]
