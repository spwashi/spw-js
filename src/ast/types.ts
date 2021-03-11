import {SpwNode} from './node/spwNode';
import {SpwNodeKind} from './node';

export interface LineColumnOffset {
    line: number;
    column: number;
    offset: number;
}

export type SpwNodeLocation = {
    start: LineColumnOffset;
    end: LineColumnOffset;
};

export interface UnhydratedSpwNode {
    kind: SpwNodeKind,
    location: SpwNodeLocation;

    [k: string]: UnhydratedSpwNode | UnhydratedSpwNode[] | string | SpwNodeLocation | any
}

export type InternalProps =
    {
        nodes: SpwNode[];
        parent?: SpwNode;
        [k: string]: any;
    };

export type InternalPropKey = keyof InternalProps;
