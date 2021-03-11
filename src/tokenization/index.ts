import {Grammar} from '@spwashi/language/language/parser-generation/grammar/grammar';
import {Rule} from '@spwashi/language/language/parser-generation/grammar/rules/rule';
import {analogRules} from './rules/analog';
import {anchorRules} from './rules/anchor';
import {channelRules} from './rules/operations/channel';
import {conceptDomainRules} from './rules/container-elements/concept';
import {domainRules} from './rules/container-elements/domain';
import {essenceRules} from './rules/container-elements/essence';
import {evaluationRules} from './rules/operations/evaluation';
import {nodeRules} from './rules/node';
import {performanceRules} from './rules/operations/performance';
import {perspectiveRules} from './rules/operations/perspective';
import {phraseRules} from './rules/phrase';
import {strandRule} from './rules/strand';
import {stringRules} from './rules/string';
import {topRule} from './rules/top';
import {invocationRules} from './rules/operations/invocation';
import {asideRules} from './rules/container-elements/aside';
import {bondRules} from './rules/bond';
import {complexAnchorRules} from './rules/complexAnchor';
import {transportRules} from './rules/transport';


export function init() {
    const rules =
              [
                  topRule,

                  //
                  ...nodeRules,
                  ...stringRules,
                  ...phraseRules,
                  ...complexAnchorRules,
                  ...analogRules,
                  ...bondRules,

                  strandRule,
                  ...transportRules,

                  // containers
                  ...domainRules,
                  ...asideRules,
                  ...conceptDomainRules,
                  ...essenceRules,

                  // operations
                  ...channelRules,
                  ...performanceRules,
                  ...invocationRules,
                  ...evaluationRules,
                  ...perspectiveRules,
                  ...anchorRules,
              ];

    const spw = new Grammar();
    rules.forEach((rule: Rule) => spw.addRule(rule));
    return spw;
}