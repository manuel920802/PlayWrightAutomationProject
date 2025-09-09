const {test, expect, request} = require('@playwright/test');
const loginPayload = {userEmail:"manuel76046@hotmail.com",userPassword:"Playwright123"};
const orderPayload = {orders: [{country: "Colombia", productOrderedId: "68a961459320a140fe1ca57a"}]};
let loginToken;
let orderId;

test.beforeAll( async ()=> 
{
    //Login API
   const apiContext = await request.newContext();
   const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
    {
        data:loginPayload
    })
    // Assert if success status code (200, 201) is returned
    expect(loginResponse.ok()).toBeTruthy();
    const loginResponseJson = await loginResponse.json();
    loginToken = loginResponseJson.token;
    console.log(loginToken);


    //Create Order API
    const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
    {
        data:orderPayload, 
        headers: {
                    'Authorization' : loginToken, 
                    'Content-Type' : 'application/json'
                },

    })
    const orderResponseJson = await orderResponse.json();
    console.log(orderResponseJson);
    orderId = orderResponseJson.orders[0];

});

test.beforeEach( ()=> 
{

});

test('Place the order', async ({page})=>
{
    //Set token (inject) in local storage
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, loginToken);

    //Open dashboard page
    await page.goto("https://rahulshettyacademy.com/client/");

    //Locators
    const ordersButton = page.getByRole("button", {name: "ORDERS"})

    //Click on "Orders" menu item
    await ordersButton.click();
    //Wait for table to appear
    await page.locator("tbody").waitFor();
    //Assert orders are loaded sucessfully by checking for "Your orders" title
    const yourOrdersTitle = page.locator(".container h1");
    await expect(yourOrdersTitle).toHaveText("Your Orders");
    //Iterate through the table
    const rows = page.locator("tbody tr");
    for(let i=0; i<await rows.count(); ++i)
    {
        //Find all rows in table and get text from orderId
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        //If found orderId matches the provided one for our order
        if(orderId.includes(rowOrderId))
        {   
            //The find the first button in row and click on it
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    //Assert orderId in summary page matches with provided orderId from previous order
    const orderIdSummaryText = await page.locator(".col-text").textContent();
    await page.pause();
    expect(orderId.includes(orderIdSummaryText)).toBeTruthy(); 
});