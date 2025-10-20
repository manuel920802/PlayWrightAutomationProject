const {test, expect} = require('@playwright/test');
class CartPage{

constructor(page){
    this.page = page;
    this.cartProducts = page.locator("div li").first();
    this.productsTitles = page.locator(".card-body b");
    this.cartButton = page.locator("[routerlink*='cart']")
    this.ordersButton = page.getByRole("button", {name: "ORDERS"});
    this.checkoutButton = page.locator("text=Checkout");
}

async verifyProductIsDisplayed(productName){
    //Wait for first element of provided locator is loaded
    await this.cartProducts.waitFor();
    //Check for product name is visible on page
    const bool = await this.getProductLocator(productName).isVisible();
    //Assert if product name is visible
    expect(bool).toBeTruthy();
}

async checkOut(){
//Click on "Checkout" button
    await this.checkoutButton.click();
}

getProductLocator(productName){
    return this.page.locator("h3:has-text('"+productName+"')");
}
}
module.exports ={CartPage};