import {domainRules} from '../../domain/rule';
import {essentialContainerRules} from '../../essence/rule';
import {conceptDomainRules} from '../../concept/rule';
import {groupRules} from '../../group/rule';
import {containerNodeRule} from '../container.rule';


export const containerNodeRules =
                 [
                     containerNodeRule,
                     ...domainRules,
                     ...essentialContainerRules,
                     ...conceptDomainRules,
                     ...groupRules,
                 ]
