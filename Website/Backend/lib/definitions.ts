export type waitlistParams = {
  name: string;
  email: string;
  designation: string;
};

export type newsLetterParams = {
  email: string;
};


// ------------------- Id  ---------------------------

export interface Point {
  xPercent: number;
  yPercent: number;
  field: string;
}

export interface FieldMapping {
  name: string;
  mapping: string;
  point: Point;
}

export interface CSVData {
  headers: string[];
  rows: Record<string, string>[];
  hasMore: boolean;
}

export interface TextPosition {
  text: string;
  xPercent: number;
  yPercent: number;
}