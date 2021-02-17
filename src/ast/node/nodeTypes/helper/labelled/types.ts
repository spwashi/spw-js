import {SpwNode} from '../../../spwNode';

export interface CanHaveLabel {
    label: SpwNode | undefined;
}

export function setLabelledNodeItem(node: CanHaveLabel) {
    const label = node.label;

    if (!(label instanceof SpwNode)) return;

    if (typeof label.setProp !== 'function') {
        console.log({node, label})
        console.error('Could not set relationship')
    }

    label?.setProp('owner', node);
}
