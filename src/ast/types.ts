import {SpwNode} from './node/spwNode';

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
    kind: string,
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
