const base = require('@playwright/test');

exports.customtest = base.test.extend(
{
    testDataForOrder : {
    username : "manuel76046@hotmail.com",
    password : "Playwright123",
    productName : "ADIDAS ORIGINAL",
    }

}

)