import ExcelJS from 'exceljs';

const COLUMNS = ['id', 'type', 'status', 'pays', 'source', 'reference', 'createdAt', 'data'];

function csvCell(value) {
  const text = value === null || value === undefined ? '' : String(value);
  if (/[",\n]/.test(text)) return `"${text.replace(/"/g, '""')}"`;
  return text;
}

export function submissionsToCsv(rows) {
  const lines = [COLUMNS.join(',')];
  for (const row of rows) {
    lines.push(
      COLUMNS.map((col) => csvCell(col === 'data' ? JSON.stringify(row.data) : row[col])).join(',')
    );
  }
  return lines.join('\n');
}

export async function submissionsToXlsx(rows) {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Soumissions');
  sheet.addRow(COLUMNS);
  for (const row of rows) {
    sheet.addRow(COLUMNS.map((col) => (col === 'data' ? JSON.stringify(row.data) : row[col] ?? '')));
  }
  return workbook.xlsx.writeBuffer();
}
