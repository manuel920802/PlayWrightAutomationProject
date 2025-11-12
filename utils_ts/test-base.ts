import {test as baseTest} from '@playwright/test';
interface testDataForOrder {
    username: string;
    password: string;
    productName: string;
};

export const customTest = baseTest.extend<{testDataForOrder:testDataForOrder}>(
{
    testDataForOrder : {
    username : "manuel76046@hotmail.com",
    password : "Playwright123",
    productName : "ADIDAS ORIGINAL",
    }

}

)