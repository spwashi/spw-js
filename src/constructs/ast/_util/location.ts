interface LineColumnOffset {
    line: number;
    column: number;
    offset?: number;
}

export type SpwNodeLocation = {
    start: LineColumnOffset;
    end: LineColumnOffset;
};
