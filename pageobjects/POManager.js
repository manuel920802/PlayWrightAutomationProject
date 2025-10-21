const {LoginPage} = require('./LoginPage');
const {DashBoardPage} = require('./DashBoardPage');
const {CartPage} = require('./CartPage');
const {OrdersReviewPage} = require('./OrdersReviewPage');
const {OrdersHistoryPage} = require('./OrdersHistoryPage');

class POManager{

constructor(page){
    this.page = page;
    //Create object of LoginPage class
    this.loginPage = new LoginPage(this.page);
    //Create object of DashBoardPage class
    this.dashBoardPage = new DashBoardPage(this.page);
    //Create object of CartPage class
    this.cartPage = new CartPage(this.page);
    //Create object of OrdersReviewPage class
    this.ordersReviewPage = new OrdersReviewPage(this.page);
    //Create object of OrderHistoryPage class
    this.ordersHistoryPage = new OrdersHistoryPage(this.page);
}

getLoginPage(){
    return this.loginPage;
}

getDashBoardPage(){
    return this.dashBoardPage;
}

getCartPage(){
    return this.cartPage;
}

getOrdersReviewPage(){
    return this.ordersReviewPage;
}

getOrdersHistoryPage(){
    return this.ordersHistoryPage;
}

}
module.exports ={POManager};