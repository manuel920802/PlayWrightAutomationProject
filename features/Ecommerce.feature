Feature: Ecommerce validations

Scenario: Placing the Order
Given a login to Ecommerce application with "manuel76046@hotmail.com" and "Playwright123"
When Add "Zara coat 3" to Cart
Then Verify "Zara coat 3" is displayed in the Cart
When Enter valid details and Place the Order
Then Verify order is present in OrderHistory