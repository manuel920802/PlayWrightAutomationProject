const ExcelJs = require("exceljs");
const {test, expect} = require('@playwright/test');

async function writeExcelTest(searchText, replaceText, change, filePath) {  
  const workBook = new ExcelJs.Workbook();
  await workBook.xlsx.readFile(filePath); 
  const workSheet = workBook.getWorksheet("Sheet1");
  const output = await readExcel(workSheet,searchText,change);

  //Write file
  const cell = workSheet.getCell(output.row, output.column+change.colChange);
  cell.value = replaceText;
  await workBook.xlsx.writeFile(filePath);
}

  //Read excel file
  async function readExcel(workSheet,searchText) {
  let output = {row:-1,column:-1};

       workSheet.eachRow((row, rowNumber) => 
        {
        row.eachCell((cell, colNumber) => 
          {
          if(cell.value === searchText)
            {
              output.row = rowNumber;
              output.column = colNumber;
            }
        })
      })
      return output;
}
//Update Mango price to 350
//writeExcelTest("Mango", 350, {rowChange:0,colChange:2},"Files/excelDownloadTest.xlsx");

test('Upload download excel validation', async ({page})=> {

const testSearch = 'Mango';
const updateValue = '350';
await page.goto("https://rahulshettyacademy.com/upload-download-test/");
const downloadPromise = page.waitForEvent('download');
await page.getByRole('button', {name:'Download'}).click();
await downloadPromise;
writeExcelTest(testSearch, 350, {rowChange:0,colChange:2},"/Users/User/Downloads/download.xlsx");
await page.locator('#fileinput').click();
await page.locator('#fileinput').setInputFiles("/Users/User/Downloads/download.xlsx");
const textLocator = page.getByText(testSearch);
const desiredRow = page.getByRole('row').filter({has:textLocator});
await expect(desiredRow.locator("#cell-4-undefined")).toContainText(updateValue);

})