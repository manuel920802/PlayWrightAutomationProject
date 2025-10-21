class DashBoardPage{

constructor(page){
    this.products = page.locator(".card-body");
    this.productsTitles = page.locator(".card-body b");
    this.cartButton = page.locator("[routerlink*='cart']");
    this.ordersButton = page.getByRole("button", {name: "ORDERS"});
}

async searchProductAddCart(productName){
        //Wait for first element of provided locator is loaded
        await this.productsTitles.first().waitFor();
    
        //Get all page card titles
        const titles = await this.productsTitles.allTextContents();
        console.log(titles);
        //Iterate between all existing products and search for specified one
        const count = await this.products.count();
        for(let i =0; i<count; ++i)
        {
            if(await this.products.nth(i).locator("b").textContent() === productName)
            {
                //Add product to cart
                await this.products.nth(i).locator("text= Add To Cart").click();
                break;
            }
        }
}

async goToOrders(){
    //Click on "Orders" menu item
    await this.ordersButton.click();
}

async goToCart(){
     //Click cart button
    await this.cartButton.click();
}
}
module.exports ={DashBoardPage};