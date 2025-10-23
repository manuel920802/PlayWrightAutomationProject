const {test, expect} = require('@playwright/test');
const {customtest} = require('../utils/test-base');


const {POManager} = require('../pageobjects/POManager');
//JSON - String - JS Object
const dataset = JSON.parse(JSON.stringify(require("../utils/placeorderTestData.json")));

for(const data of dataset){
test(`Client App Login for ${data.productName}`, async ({page})=>
{
    //Create Object of POManager class
    const poManager = new POManager(page);

    //Create object of LoginPage class using POManager getter method
    const loginPage = poManager.getLoginPage();
    //Go to login page
    await loginPage.goToLoginPage(); 
    //Login with provided credentials
    await loginPage.validLogin(data.username,data.password);

    //Create object of DashBoardPage class using POManager getter method
    const dashBoardPage = poManager.getDashBoardPage();
    //Go to dashboard page and add provided product to cart
    await dashBoardPage.searchProductAddCart(data.productName);
    //Go to cart page
    await dashBoardPage.goToCart();

    //Create object of CartPage class using POManager getter method
    const cartPage = poManager.getCartPage();
    //Check if added to cart product provided name is displayed
    await cartPage.verifyProductIsDisplayed(data.productName);
    //Go to dashboard page
    await cartPage.checkOut();

    //Create object of CartPage class using POManager getter method
    const ordersReviewPage = poManager.getOrdersReviewPage();
     //Check email is correct
    await ordersReviewPage.verifyEmailIsCorrect(data.username);
    //Type CCV code
    await ordersReviewPage.typeCCVCode(data.ccvCode);
    //Type name on card
    await ordersReviewPage.typeNameOnCard(data.nameOnCard);
    //Apply discount coupon
    await ordersReviewPage.applyCoupon(data.couponCode);
    //Select expiration date on card
    await ordersReviewPage.selectExpiryDate("08","20");
    //Type provided country characters in country field and select provided country name
    await ordersReviewPage.selectCountry("ind","India");
    //Get orderId
    const orderId = await ordersReviewPage.placeOrderAndDisplayOrderId();
    //Print orderID on console
    console.log(orderId);
    //Go to Order history page
    await dashBoardPage.goToOrders();
    

    //Create object of OrdersHistoryPage class using POManager getter method
    const ordersHistoryPage = poManager.getOrdersHistoryPage();
    //Select the first order and click on "View" button
    await ordersHistoryPage.selectOrderByOrderID(orderId);
    //Compare the current orderId in order summary page against the placed orderId
    expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();

});
}

customtest.only('Client App Login', async ({page,testDataForOrder})=>
{
    //Create Object of POManager class
    const poManager = new POManager(page);

    //Create object of LoginPage class using POManager getter method
    const loginPage = poManager.getLoginPage();
    //Go to login page
    await loginPage.goToLoginPage(); 
    //Login with provided credentials
    await loginPage.validLogin(testDataForOrder.username,testDataForOrder.password);

    //Create object of DashBoardPage class using POManager getter method
    const dashBoardPage = poManager.getDashBoardPage();
    //Go to dashboard page and add provided product to cart
    await dashBoardPage.searchProductAddCart(testDataForOrder.productName);
    //Go to cart page
    await dashBoardPage.goToCart();

    //Create object of CartPage class using POManager getter method
    const cartPage = poManager.getCartPage();
    //Check if added to cart product provided name is displayed
    await cartPage.verifyProductIsDisplayed(testDataForOrder.productName);
    //Go to dashboard page
    await cartPage.checkOut();
});