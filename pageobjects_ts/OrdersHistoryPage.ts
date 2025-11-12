import { Locator, Page } from "@playwright/test";

export class OrdersHistoryPage{
    ordersTable: Locator;
    rows: Locator;
    orderIdSummaryText: Locator;
    page: Page;

constructor(page:Page){
    this.page = page;
    this.ordersTable = page.locator("tbody");
    this.rows = page.locator("tbody tr");
    this.orderIdSummaryText = page.locator(".col-text");
}

async selectOrderByOrderID(orderIdText:any){
    await this.ordersTable.waitFor();
    //Iterate through the table
    for(let i=0; i<await this.rows.count(); ++i)
    {
        //Find all rows in table and get text from orderId
        const rowOrderId = await this.rows.nth(i).locator("th").textContent();
        //If found orderId matches the provided one for our order
        if(orderIdText.includes(rowOrderId))
        {   
            //The find the first button in row and click on it
            await this.rows.nth(i).locator("button").first().click();
            break;
        }
    }
}

async getOrderId()
{
    return await this.orderIdSummaryText.textContent();
}


}
module.exports ={OrdersHistoryPage};