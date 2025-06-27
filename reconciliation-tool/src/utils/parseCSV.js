import Papa from 'papaparse';

export function parseCSV(file, callback) {
  Papa.parse(file, {
    header: true,
    skipEmptyLines: true,
    complete: results => {
      console.log('CSV Parse results:', results);
      console.log('Parsed data:', results.data);
      console.log('Sample row:', results.data[0]);
      console.log('Available fields:', results.data[0] ? Object.keys(results.data[0]) : 'No data');
      callback(results.data);
    },
  });
}