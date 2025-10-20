const {LoginPage} = require('./LoginPage');
const {DashBoardPage} = require('./DashBoardPage');
const {CartPage} = require('./CartPage');

class POManager{

constructor(page){
    this.page = page;
    //Create object of LoginPage class
    this.loginPage = new LoginPage(this.page);
    //Create object of DashBoardPage class
    this.dashBoardPage = new DashBoardPage(this.page);
    //Create object of CartPage class
    this.cartPage = new CartPage(this.page);
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


}
module.exports ={POManager};