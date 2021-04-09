export interface LineColumnOffset {
    line: number;
    column: number;
    offset?: number;
}

export type SpwNodeLocation = {
    start: LineColumnOffset;
    end: LineColumnOffset;
};
const lcoToString   = (start: LineColumnOffset): string => [start.line, start.column, start.offset].join('|');
const lcoFromString = (str: string): LineColumnOffset => {
    const start = str.split('|');
    return {
        line:   +start[0],
        column: +start[1],
        offset: +start[2],
    };
};

/**
 *
 * @param _loc
 */
export function parseLocation(_loc: SpwNodeLocation | string): SpwNodeLocation {
    if (typeof _loc !== 'string') return _loc;

    const split = _loc.split(' ');
    return {
        start: lcoFromString(split[0]),
        end:   lcoFromString(split[1]),
    }
}

/**
 *
 * @param start
 * @param end
 */
export function stringifyLocation({start, end}: SpwNodeLocation): string {
    return [lcoToString(start), lcoToString(end)].join(' ');
}