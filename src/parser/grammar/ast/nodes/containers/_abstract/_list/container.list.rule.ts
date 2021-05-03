import {domainRules} from '../../domain/domain.container.rule';
import {essentialContainerRules} from '../../essence/essence.container.rule';
import {conceptDomainRules} from '../../concept/concept.container.rule';
import {groupRules} from '../../group/group.container.rule';
import {containerNodeRule} from '../container.rule';


export const containerNodeRules =
                 [
                     containerNodeRule,
                     ...domainRules,
                     ...essentialContainerRules,
                     ...conceptDomainRules,
                     ...groupRules,
                 ]
