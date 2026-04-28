const XLSX = require('xlsx');
const path = require('path');

const filePath = path.join(__dirname, '../../jamu206.xlsx');
const wb = XLSX.readFile(filePath);

console.log('Sheets:', wb.SheetNames);
wb.SheetNames.forEach(name => {
  const ws = wb.Sheets[name];
  const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
  console.log('\n=== Sheet:', name, '===');
  console.log('Total rows:', data.length);
  console.log('Headers:', JSON.stringify(data[0]));
  if (data[1]) console.log('Row 1:', JSON.stringify(data[1]));
  if (data[2]) console.log('Row 2:', JSON.stringify(data[2]));
  if (data[3]) console.log('Row 3:', JSON.stringify(data[3]));
});
