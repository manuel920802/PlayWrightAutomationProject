const {test, expect} = require('@playwright/test');
const {POManager} = require('../pageobjects/POManager');

test('Client App Login Test', async ({page})=>
{
    //Local variables to store values
    const username = "manuel76046@hotmail.com";
    const password = "Playwright123";
    const productName = 'ADIDAS ORIGINAL';
    const countrySearchText = "ind";
    const countryName = "India";
    const ccvCode = "123"
    const nameOnCard = "Manuel Paez";
    const couponCode = "rahulshettyacademy"
    const expireMonth = "08";
    const expireDay = "20";

    //Create Object of POManager class
    const poManager = new POManager(page);

    //Create object of LoginPage class using POManager getter method
    const loginPage = poManager.getLoginPage();
    //Go to login page
    await loginPage.goToLoginPage(); 
    //Login with provided credentials
    await loginPage.validLogin(username,password);

    //Create object of DashBoardPage class using POManager getter method
    const dashBoardPage = poManager.getDashBoardPage();
    //Go to dashboard page and add provided product to cart
    await dashBoardPage.searchProductAddCart(productName);
    //Go to cart page
    await dashBoardPage.goToCart();

    //Create object of CartPage class using POManager getter method
    const cartPage = poManager.getCartPage();
    //Check if added to cart product provided name is displayed
    await cartPage.verifyProductIsDisplayed(productName);
    //Go to dashboard page
    await cartPage.checkOut();

    //Create object of CartPage class using POManager getter method
    const ordersReviewPage = poManager.getOrdersReviewPage();
     //Check email is correct
    await ordersReviewPage.verifyEmailIsCorrect(username);
    //Type CCV code
    await ordersReviewPage.typeCCVCode(ccvCode);
    //Type name on card
    await ordersReviewPage.typeNameOnCard(nameOnCard);
    //Apply discount coupon
    await ordersReviewPage.applyCoupon(couponCode);
    //Select expiration date on card
    await ordersReviewPage.selectExpiryDate(expireMonth,expireDay);
    //Type provided country characters in country field and select provided country name
    await ordersReviewPage.selectCountry(countrySearchText,countryName);
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
    await page.pause();


});