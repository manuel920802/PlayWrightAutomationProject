const {test, expect} = require('@playwright/test');
class OrdersReviewPage{

constructor(page){
    this.page = page;
    this.countryField = page.locator("[placeholder*='Country']");
    this.countryDropdown = page.locator(".ta-results");
    this.emailField = page.locator(".user__name [type='text']").first();
    this.ccvField = page.locator("input[type='text']").nth(1);
    this.nameOnCardField = page.locator("input[type='text']").nth(2);
    this.couponField = page.locator("input[name='coupon']");
    this.applyCouponButton = page.locator("button[type='submit']");
    this.couponAppliedText = page.locator("p[class='mt-1 ng-star-inserted']");
    this.monthDropdown = page.locator("select").first();
    this.dayDropdown = page.locator("select").last();
    this.placeOrderButton = page.locator(".action__submit");
    this.thankYouTitle = page.locator(".hero-primary");
    this.orderId = page.locator(".em-spacer-1 .ng-star-inserted");
    
}

async selectCountry(countrySearchText,countryName){
    //Type country in text selected field slowly and provide delay of 150 mls between each key press
    await this.countryField.pressSequentially(countrySearchText, {delay: 100});
    //Click on suggested option by iterating on each one
        await this.countryDropdown.waitFor();
        const optionsCount = await this.countryDropdown.locator("button").count();
        for(let i=0; i<optionsCount; ++i)
        {
            const text = await this.countryDropdown.locator("button").nth(i).textContent();
            if(text.trim() === countryName)
            {
                //Click option which matches provided text
                await this.countryDropdown.locator("button").nth(i).click();
                break;
            }
        }
}

async verifyEmailIsCorrect(username){
    //Assert email username is correct
    await expect(this.emailField).toHaveText(username);
}

async typeCCVCode(ccvCode){
    //Type in "CCV code" text field
    await this.ccvField.fill(ccvCode);
}

async typeNameOnCard(nameOnCard){
    //Type in "Name on card" text field
    await this.nameOnCardField.fill(nameOnCard);
}

async applyCoupon(couponCode){
    //Type in "Coupon" text field 
    await this.couponField.fill(couponCode);
    //Click on "Apply coupon" button
    await this.applyCouponButton.click();
    //Wait for coupon applied text to appear
    await this.couponAppliedText.waitFor();
    //Assert coupon was applied
    const isCouponApplied = await this.couponAppliedText.isVisible();
    expect(isCouponApplied).toBeTruthy();
}

async selectExpiryDate(expireMonth,expireDay){
    //Select expiry month dropdown field
    await this.monthDropdown.waitFor();
    await this.monthDropdown.selectOption(expireMonth);
    //Select expiry day dropdown field
    await this.dayDropdown.waitFor();
    await this.dayDropdown.selectOption(expireDay);
}

async placeOrderAndDisplayOrderId(){
    await this.placeOrderButton.click();
    //Assert order was placed successfully by checking for "Thank you for the order" title
    await expect(this.thankYouTitle).toHaveText(" Thankyou for the order. ");
    //Get OrderID text
    return await this.orderId.textContent();
}
}
module.exports = {OrdersReviewPage};