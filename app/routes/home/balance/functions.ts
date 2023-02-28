import * as fs from "fs";

/**
 * @description take data from csv and return an array of object
 */
interface CsvData {
  [key: string]: string;
}

export function csvToArray(filePath: string): CsvData[] {
  const fileContent: string = fs.readFileSync(filePath, "utf8");
  const rows: string[] = fileContent.split("\n");
  const headers: string[] = rows[0].split(",");
  const dataArray: CsvData[] = [];

  for (let i = 1; i < rows.length; i++) {
    const row: string[] = rows[i].split(",");
    if (row.length === headers.length) {
      const data: CsvData = {};
      for (let j = 0; j < headers.length; j++) {
        data[headers[j]] = row[j];
      }
      dataArray.push(data);
    }
  }

  return dataArray;
}
