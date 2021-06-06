import { domain, domainComponents } from '../../domain/ref';
import { essence, essenceComponents } from '../../essence/ref';
import { concept, conceptComponents } from '../../concept/ref';
import { group, groupComponents } from '../../group/ref';

export const containers = [domain, essence, concept, group];

export const containerComponents = [
  domainComponents,
  essenceComponents,
  conceptComponents,
  groupComponents,
];

export const containerDelimiters = containerComponents.flatMap((item) => [
  item.open,
  item.close,
]);
