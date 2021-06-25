interface LineColumnOffset {
  line: number;
  column: number;
  offset?: number;
}

export type ConstructLocation = {
  start: LineColumnOffset;
  end: LineColumnOffset;
};
