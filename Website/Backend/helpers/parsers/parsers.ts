import Papa from "papaparse";

export interface CSVData {
  headers: string[];
  rows: Record<any | string, any | string>[];
  hasMore: boolean;
}

export async function parseCSV(content: string): Promise<CSVData> {
  return new Promise((resolve, reject) => {
    Papa.parse(content, {
      complete(results) {
        if (results.data.length < 2) {
          reject(new Error("CSV must contain headers and at least one row"));
          return;
        }

        const headers = results.data[0] as string[];
        const rows = (results.data.slice(1) as string[][]).map(row => {
          const obj: Record<string, string> = {};
          headers.forEach((header, index) => {
            obj[header] = row[index];
          });
          return obj;
        });

        resolve({
          headers: headers,
          rows: rows,
          hasMore: false,
        });
      },
      header: false,
      skipEmptyLines: true,
      dynamicTyping: true,
      comments: "#",
    });
  });
}
