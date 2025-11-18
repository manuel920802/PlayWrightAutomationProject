Feature: Ecommerce validations
@Regression
Scenario: Placing the Order
Given a login to Ecommerce application with "manuel76046@hotmail.com" and "Playwright123"
When Add "ADIDAS ORIGINAL" to Cart
Then Verify "ADIDAS ORIGINAL" is displayed in the Cart
When Enter valid details and Place the Order
Then Verify order is present in OrderHistory

@Validation
Scenario Outline: Placing the Order
Given a login to Ecommerce2 application with "<username>" and "<password>"
Then Verify Error message is displayed

Examples:
|username         | password   |
|rahulshetty1     | learning1  |
|rahul@shetty.com | wrongpass@ |