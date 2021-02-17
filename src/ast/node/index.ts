import {SpwChannelNode} from './nodeTypes/channelNode';
import {SpwTransportNode} from './nodeTypes/transportNode';
import {SpwDomainNode} from './nodeTypes/domainNode';
import {SpwEvaluationNode} from './nodeTypes/evaluationNode';
import {SpwConceptNode} from './nodeTypes/conceptNode';
import {SpwEssenceNode} from './nodeTypes/essenceNode';
import {SpwNodeNode} from './nodeTypes/nodeNode';
import {SpwPerformanceNode} from './nodeTypes/performanceNode';
import {SpwAnchorNode} from './nodeTypes/anchorNode';
import {SpwPhraseNode} from './nodeTypes/phraseNode';
import {SpwPerspectiveNode} from './nodeTypes/perspectiveNode';
import {SpwStrandNode} from './nodeTypes/strandNode';
import {SpwStringNode} from './nodeTypes/stringNode';

export const spwNodeConstructors =
                 {
                     anchor:      SpwAnchorNode,
                     channel:     SpwChannelNode,
                     concept:     SpwConceptNode,
                     domain:      SpwDomainNode,
                     evaluation:  SpwEvaluationNode,
                     essence:     SpwEssenceNode,
                     node:        SpwNodeNode,
                     performance: SpwPerformanceNode,
                     perspective: SpwPerspectiveNode,
                     phrase:      SpwPhraseNode,
                     strand:      SpwStrandNode,
                     string:      SpwStringNode,
                     transport:   SpwTransportNode,
                 };
export type SpwNodeConstructors = typeof spwNodeConstructors;
export type SpwNodeKind = keyof SpwNodeConstructors;
