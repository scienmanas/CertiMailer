import Papa from "papaparse";
import { CSVData } from "../../lib/definitions";

export async function parseCSV(
  content: string,
  loggedIn: boolean
): Promise<CSVData> {
  return new Promise((resolve, reject) => {
    Papa.parse(content, {
      complete(results) {
        if (results.data.length < 2) {
          reject(new Error("CSV must contain headers and at least one row"));
          return;
        }

        const headers = results.data[0] as string[];
        const emails: string[] = [];
        const rows = (results.data.slice(1) as string[][]).map((row) => {
          const obj: Record<string, string> = {};
          headers.forEach((header, index) => {
            if (loggedIn) {
              if (index === 1) emails.push(row[index]); // For user email
              else obj[header] = row[index];
            } else obj[header] = row[index]; // For not logged user
          });
          return obj;
        });

        resolve({
          headers: headers,
          rows: rows,
          ...(loggedIn ? { emails: emails } : {}),
        });
      },
      header: false,
      skipEmptyLines: true,
      dynamicTyping: true,
      comments: "#",
    });
  });
}
