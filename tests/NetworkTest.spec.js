const {test, expect, request} = require('@playwright/test');
const {APIUtils} = require('../utils/APIUtils');
const loginPayload = {userEmail:"manuel76046@hotmail.com",userPassword:"Playwright123"};
const orderPayload = {orders: [{country: "Colombia", productOrderedId: "68a961459320a140fe1ca57a"}]};
const fakePayloadOrders = {data:[],message:"No Orders"};

let response;
test.beforeAll( async ()=> 
{
   const apiContext = await request.newContext();
   const apiUtils = new APIUtils(apiContext, loginPayload);
   response = await apiUtils.createOrder(orderPayload);
})

//Create order is successful
test('Place the order', async ({page})=>
{
    //Set token (inject) in local storage
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);

    //Open dashboard page
    await page.goto("https://rahulshettyacademy.com/client/");

    //Locator for MyOrders button
    const ordersButton = page.getByRole("button", {name: "ORDERS"})
    //Re-Route the API request URL
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*", 
        async route=>
        {   
            //Fetch API response
            const response = await page.request.fetch(route.request())
            //Send fake response back to browser
            let body = JSON.stringify(fakePayloadOrders);
            route.fulfill(
                {
                    response,
                    body,
                });
            //Intercepting response - API response->{playwright fakeresponse}->browser->render data on front end
        });

    //Click on "Orders" menu item
    await ordersButton.click();
    //Wait for response to be sent
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")
    //Assert No orders title is displayed
    const noOrdersTitle = page.locator(".mt-4");
    await expect(noOrdersTitle).toHaveText(" You have No Orders to show at this time. Please Visit Back Us ")
});