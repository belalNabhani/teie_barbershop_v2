/**
 * Fetches data from a public Google Sheet
 *
 * @param sheetId - The Google Sheet ID from the URL
 * @param sheetName - The name of the sheet/tab (default: "Sheet1")
 * @returns Promise with the sheet data as a 2D array
 */
export async function fetchGoogleSheet(sheetId: string, sheetName: string = "Sheet1"): Promise<string[][]> {
  try {
    // Using Google Sheets JSON API (works for public sheets)
    const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(sheetName)}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch Google Sheet: ${response.statusText}`);
    }

    const text = await response.text();

    // The API returns JSON wrapped in a callback, we need to extract it
    // Format: google.visualization.Query.setResponse({...})
    const jsonMatch = text.match(/google\.visualization\.Query\.setResponse\((.*)\)/);

    if (!jsonMatch) {
      throw new Error('Invalid response format from Google Sheets');
    }

    const data = JSON.parse(jsonMatch[1]);

    // Extract rows from the response
    const rows: string[][] = [];

    if (data.table && data.table.rows) {
      data.table.rows.forEach((row: { c?: Array<{ v?: string | number }> }) => {
        const rowData: string[] = [];
        if (row.c) {
          row.c.forEach((cell: { v?: string | number }) => {
            rowData.push(String(cell?.v || ''));
          });
        }
        rows.push(rowData);
      });
    }

    return rows;
  } catch (error) {
    console.error('Error fetching Google Sheet:', error);
    throw error;
  }
}


