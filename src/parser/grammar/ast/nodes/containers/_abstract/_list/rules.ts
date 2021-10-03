import { conceptDomainRules } from '../../concept/rule';
import { domainRules } from '../../domain/rule';
import { essentialContainerRules } from '../../essence/rule';
import { locationRules } from '../../location/rule';
import { containerNodeRule } from '../container.rule';

export const containerNodeRules = [
  containerNodeRule,
  ...domainRules,
  ...essentialContainerRules,
  ...conceptDomainRules,
  ...locationRules,
];
